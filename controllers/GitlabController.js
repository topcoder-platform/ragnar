/*
 * Copyright (c) 2017 TopCoder, Inc. All rights reserved.
 */

/**
 * This controller exposes Gitlab REST endpoints.
 *
 * @author TCSCODER
 * @version 1.0
 */
const superagent = require('superagent');
const superagentPromise = require('superagent-promise');
const helper = require('../common/helper');
const errors = require('../common/errors');
const constants = require('../common/constants');
const config = require('../config');
const GitlabService = require('../services/GitlabService');
const User = require('../models').User;
const OwnerUserGroup = require('../models').OwnerUserGroup;

const request = superagentPromise(superagent, Promise);

// milliseconds per second
const MS_PER_SECOND = 1000;

/**
 * Owner user login.
 * @param {Object} req the request
 * @param {Object} res the response
 */
async function ownerUserLogin(req, res) {
  // generate an identifier if not present,
  // the identifier is used as OAuth state
  if (!req.session.state) {
    req.session.state = helper.generateIdentifier();
  }
  // redirect to GitLab OAuth
  const callbackUri = `${config.WEBSITE}${config.GITLAB_OWNER_CALLBACK_URL}`;
  res.redirect(`https://gitlab.com/oauth/authorize?client_id=${
    config.GITLAB_CLIENT_ID
  }&redirect_uri=${
    encodeURIComponent(callbackUri)
  }&response_type=code&state=${req.session.state}&scope=api`);
}

/**
 * Owner user login callback, redirected by GitLab.
 * @param {Object} req the request
 * @param {Object} res the response
 */
async function ownerUserLoginCallback(req, res) {
  if (!req.session.state || req.query.state !== req.session.state) {
    throw new errors.ForbiddenError('Invalid state.');
  }
  const code = req.query.code;
  if (!code) {
    throw new errors.ValidationError('Missing code.');
  }
  // exchange code to get token
  const result = await request
    .post('https://gitlab.com/oauth/token')
    .query({
      client_id: config.GITLAB_CLIENT_ID,
      client_secret: config.GITLAB_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
      redirect_uri: `${config.WEBSITE}${config.GITLAB_OWNER_CALLBACK_URL}`,
    })
    .end();
  const accessToken = result.body.access_token;
  const refreshToken = result.body.refresh_token;
  const expiresIn = result.body.expires_in || constants.GITLAB_ACCESS_TOKEN_DEFAULT_EXPIRATION;
  // ensure the user is valid owner user
  const ownerUser = await GitlabService.ensureOwnerUser(accessToken);
  // save user token data
  ownerUser.accessToken = accessToken;
  ownerUser.accessTokenExpiration = new Date(new Date().getTime() + expiresIn * MS_PER_SECOND);
  ownerUser.refreshToken = refreshToken;
  await ownerUser.save();
  // refresh token periodically
  // store username to session
  req.session.gitlabOwnerUsername = ownerUser.username;
  // redirect to success page
  res.redirect(config.GITLAB_OWNER_USER_LOGIN_SUCCESS_URL);
}

/**
 * List groups of owner user.
 * @param {Object} req the request
 * @returns {Object} the owner user groups
 */
async function listOwnerUserGroups(req) {
  if (!req.session.gitlabOwnerUsername) {
    throw new errors.UnauthorizedError('Unauthorized owner user.');
  }
  return await GitlabService.listOwnerUserGroups(req.session.gitlabOwnerUsername, req.query.page, req.query.perPage);
}

/**
 * Get group registration URL.
 * @param {Object} req the request
 * @returns {Object} the group registration URL
 */
async function getGroupRegistrationUrl(req) {
  if (!req.session.gitlabOwnerUsername) {
    throw new errors.UnauthorizedError('Unauthorized owner user.');
  }
  return await GitlabService.getGroupRegistrationUrl(req.session.gitlabOwnerUsername, req.params.id);
}

/**
 * Add user to group.
 * @param {Object} req the request
 * @param {Object} res the response
 */
async function addUserToGroup(req, res) {
  const identifier = req.params.identifier;
  // validate the identifier
  await helper.ensureExists(OwnerUserGroup, {identifier});

  // store identifier to session, to be compared in callback
  req.session.identifier = identifier;

  // redirect to GitLab OAuth
  const callbackUri = `${config.WEBSITE}/api/${config.API_VERSION}/gitlab/normaluser/callback`;
  res.redirect(`https://gitlab.com/oauth/authorize?client_id=${
    config.GITLAB_CLIENT_ID
  }&redirect_uri=${
    encodeURIComponent(callbackUri)
  }&response_type=code&state=${identifier}&scope=read_user`);
}

/**
 * Normal user callback, to be added to group. Redirected by GitLab.
 * @param {Object} req the request
 * @param {Object} res the response
 */
async function addUserToGroupCallback(req, res) {
  if (req.query.error_description) {
    throw new errors.ForbiddenError(req.query.error_description.replace(/\+/g, ' '));
  }
  if (!req.session.identifier || req.query.state !== req.session.identifier) {
    throw new errors.ForbiddenError('Invalid state.');
  }
  const identifier = req.session.identifier;
  const code = req.query.code;
  if (!code) {
    throw new errors.ValidationError('Missing code.');
  }
  const group = await helper.ensureExists(OwnerUserGroup, {identifier});
  // get owner user
  const ownerUser = await helper.ensureExists(User,
    {username: group.ownerUsername, type: constants.USER_TYPES.GITLAB, role: constants.USER_ROLES.OWNER});

  // refresh the owner user access token if needed
  if (ownerUser.accessTokenExpiration.getTime() <=
    new Date().getTime() + constants.GITLAB_REFRESH_TOKEN_BEFORE_EXPIRATION * MS_PER_SECOND) {
    const refreshTokenResult = await request
      .post('https://gitlab.com/oauth/token')
      .query({
        client_id: config.GITLAB_CLIENT_ID,
        client_secret: config.GITLAB_CLIENT_SECRET,
        refresh_token: ownerUser.refreshToken,
        grant_type: 'refresh_token',
        redirect_uri: `${config.WEBSITE}/api/${config.API_VERSION}/gitlab/owneruser/callback`,
      })
      .end();
    // save user token data
    ownerUser.accessToken = refreshTokenResult.body.access_token;
    const expiresIn = refreshTokenResult.body.expires_in || constants.GITLAB_ACCESS_TOKEN_DEFAULT_EXPIRATION;
    ownerUser.accessTokenExpiration = new Date(new Date().getTime() + expiresIn * MS_PER_SECOND);
    ownerUser.refreshToken = refreshTokenResult.body.refresh_token;
    await ownerUser.save();
  }

  // exchange code to get normal user token
  const result = await request
    .post('https://gitlab.com/oauth/token')
    .query({
      client_id: config.GITLAB_CLIENT_ID,
      client_secret: config.GITLAB_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
      redirect_uri: `${config.WEBSITE}/api/${config.API_VERSION}/gitlab/normaluser/callback`,
    })
    .end();
  const token = result.body.access_token;
  // add user to group
  await GitlabService.addGroupMember(group.groupId, ownerUser.accessToken, token);
  // redirect to success page
  res.redirect(config.GITLAB_USER_ADDED_TO_GROUP_SUCCESS_URL);
}

module.exports = {
  ownerUserLogin,
  ownerUserLoginCallback,
  listOwnerUserGroups,
  getGroupRegistrationUrl,
  addUserToGroup,
  addUserToGroupCallback,
};

helper.buildController(module.exports);
