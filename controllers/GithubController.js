/*
 * Copyright (c) 2017 TopCoder, Inc. All rights reserved.
 */

/**
 * This controller exposes Github REST endpoints.
 *
 * @author TCSCODER
 * @version 1.0
 */
const superagent = require('superagent');
const superagentPromise = require('superagent-promise');
const helper = require('../common/helper');
const errors = require('../common/errors');
const config = require('../config');
const GithubService = require('../services/GithubService');
const OwnerUserTeam = require('../models').OwnerUserTeam;

const request=superagentPromise(superagent, Promise);

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
  // redirect to GitHub OAuth
  const callbackUri = `${config.WEBSITE}${config.GITHUB_OWNER_CALLBACK_URL}`;
  res.redirect(`http://github.com/login/oauth/authorize?client_id=${
    config.GITHUB_CLIENT_ID
  }&redirect_uri=${
    encodeURIComponent(callbackUri)
  }&scope=${
    encodeURIComponent('admin:org')
  }&state=${req.session.state}`);
}

/**
 * Owner user login callback, redirected by GitHub.
 * @param {Object} req the request
 * @returns {Object} success message
 */
async function ownerUserLoginCallback(req) {
  if (!req.session.state || req.query.state !== req.session.state) {
    throw new errors.ForbiddenError('Invalid state.');
  }
  const code = req.query.code;
  if (!code) {
    throw new errors.ValidationError('Missing code.');
  }
  // exchange code to get token
  const result = await request
    .post('https://github.com/login/oauth/access_token')
    .query({client_id: config.GITHUB_CLIENT_ID, client_secret: config.GITHUB_CLIENT_SECRET, code})
    .set('Accept', 'application/json')
    .end();
  const token = result.body.access_token;
  // ensure the user is valid owner user
  const ownerUser = await GithubService.ensureOwnerUser(token);
  // store access token to session
  req.session.ownerUserAccessToken = token;
  req.session.ownerUsername = ownerUser.username;

  // return success status
  return {success: true, token, username: ownerUser.username};
}

/**
 * List teams of owner user.
 * @param {Object} req the request
 * @returns {Object} the owner user teams
 */
async function listOwnerUserTeams(req) {
  if (!req.session.ownerUserAccessToken) {
    throw new errors.UnauthorizedError('Unauthorized owner user.');
  }
  return await GithubService.listOwnerUserTeams(req.session.ownerUserAccessToken, req.query.page, req.query.perPage);
}

/**
 * List teams of owner user.
 * @param {Object} req the request
 * @returns {Object} the team registration URL
 */
async function getTeamRegistrationUrl(req) {
  if (!req.session.ownerUserAccessToken) {
    throw new errors.UnauthorizedError('Unauthorized owner user.');
  }
  return await GithubService.getTeamRegistrationUrl(req.session.ownerUserAccessToken,
    req.session.ownerUsername, req.params.id);
}

/**
 * Add user to team.
 * @param {Object} req the request
 * @param {Object} res the response
 */
async function addUserToTeam(req, res) {
  const identifier = req.params.identifier;
  // validate the identifier
  await helper.ensureExists(OwnerUserTeam, {identifier});

  // store identifier to session, to be compared in callback
  req.session.identifier = identifier;

  // redirect to GitHub OAuth
  const callbackUri = `${config.WEBSITE}/api/${config.API_VERSION}/github/normaluser/callback`;
  res.redirect(`http://github.com/login/oauth/authorize?client_id=${
    config.GITHUB_CLIENT_ID
  }&redirect_uri=${
    encodeURIComponent(callbackUri)
  }&state=${identifier}`);
}

/**
 * Normal user callback, to be added to team. Redirected by GitHub.
 * @param {Object} req the request
 * @param {Object} res the response
 */
async function addUserToTeamCallback(req, res) {
  if (!req.session.identifier || req.query.state !== req.session.identifier) {
    throw new errors.ForbiddenError('Invalid state.');
  }
  const identifier = req.session.identifier;
  const code = req.query.code;
  if (!code) {
    throw new errors.ValidationError('Missing code.');
  }
  const team = await helper.ensureExists(OwnerUserTeam, {identifier});
  // exchange code to get token
  const result = await request
    .post('https://github.com/login/oauth/access_token')
    .query({client_id: config.GITHUB_CLIENT_ID, client_secret: config.GITHUB_CLIENT_SECRET, code})
    .set('Accept', 'application/json')
    .end();
  const token = result.body.access_token;
  // add user to team
  await GithubService.addTeamMember(team.teamId, team.ownerToken, token);
  // redirect to success page
  res.redirect(config.USER_ADDED_TO_TEAM_SUCCESS_URL);
}

module.exports = {
  ownerUserLogin,
  ownerUserLoginCallback,
  listOwnerUserTeams,
  getTeamRegistrationUrl,
  addUserToTeam,
  addUserToTeamCallback,
};

helper.buildController(module.exports);
