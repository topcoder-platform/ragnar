/*
 * Copyright (c) 2017 TopCoder, Inc. All rights reserved.
 */

/**
 * This service will provide GitLab operations.
 *
 * @author TCSCODER
 * @version 1.0
 */
const Joi = require('joi');
const superagent = require('superagent');
const superagentPromise = require('superagent-promise');
const config = require('../config');
const constants = require('../common/constants');
const helper = require('../common/helper');
const errors = require('../common/errors');
const User = require('../models').User;
const OwnerUserGroup = require('../models').OwnerUserGroup;

const request = superagentPromise(superagent, Promise);

// milliseconds per second
const MS_PER_SECOND = 1000;

/**
 * Ensure the owner user is in database.
 * @param {String} token the access token of owner user
 * @returns {Promise} the promise result of found owner user
 */
async function ensureOwnerUser(token) {
  let userProfile;
  try {
    // get current user name
    userProfile = await request
      .get(`${config.GITLAB_API_BASE_URL}/user`)
      .set('Authorization', `Bearer ${token}`)
      .end()
      .then((res) => res.body);
  } catch (err) {
    throw helper.convertGitLabError(err, 'Failed to ensure valid owner user.');
  }
  if (!userProfile) {
    throw new errors.UnauthorizedError('Can not get user from the access token.');
  }
  const user = await helper.ensureExists(User,
    {userProviderId: userProfile.id, type: constants.USER_TYPES.GITLAB, role: constants.USER_ROLES.OWNER});
  user.userProviderId = userProfile.id;
  user.username = userProfile.username;
  return await user.save();
}

ensureOwnerUser.schema = Joi.object().keys({
  token: Joi.string().required(),
});

/**
 * List groups of owner user.
 * @param {String} username the owner user name
 * @param {Number} page the page number (default to be 1). Must be >= 1
 * @param {Number} perPage the page size (default to be constants.GITLAB_DEFAULT_PER_PAGE).
 *   Must be within range [1, constants.GITLAB_MAX_PER_PAGE]
 * @returns {Promise} the promise result
 */
async function listOwnerUserGroups(username, page = 1, perPage = constants.GITLAB_DEFAULT_PER_PAGE) {
  const ownerUser = await helper.ensureExists(User,
    {username, type: constants.USER_TYPES.GITLAB, role: constants.USER_ROLES.OWNER});

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

  try {
    const response = await request
      .get(`${config.GITLAB_API_BASE_URL}/groups`)
      .query({page, per_page: perPage, owned: true})
      .set('Authorization', `Bearer ${ownerUser.accessToken}`)
      .end();

    const result = {
      page,
      perPage,
      lastPage: 1,
      groups: response.body,
    };

    if (response.headers.link) {
      const links = response.headers.link.split(/\s*,\s*/);
      links.forEach((link) => {
        if (link.endsWith('rel="last"')) {
          const matches = link.match(/.*[?&]page=(\d+).*/);
          if (matches) {
            result.lastPage = parseInt(matches[1], 10);
          }
        }
      });
    }
    return result;
  } catch (err) {
    throw helper.convertGitLabError(err, 'Failed to list user groups');
  }
}

listOwnerUserGroups.schema = Joi.object().keys({
  username: Joi.string().required(),
  page: Joi.number().integer().min(1).optional(),
  perPage: Joi.number().integer().min(1).max(constants.GITLAB_MAX_PER_PAGE)
    .optional(),
});

/**
 * Get owner user group registration URL.
 * @param {String} ownerUsername the owner user name
 * @param {String} groupId the group id
 * @returns {Promise} the promise result
 */
async function getGroupRegistrationUrl(ownerUsername, groupId) {
  // generate identifier
  const identifier = helper.generateIdentifier();

  // create owner user group
  await OwnerUserGroup.create({
    ownerUsername,
    type: constants.USER_TYPES.GITLAB,
    groupId,
    identifier,
  });

  // construct URL
  const url = `${config.WEBSITE}/api/${config.API_VERSION}/gitlab/groups/registration/${identifier}`;
  return {url};
}

getGroupRegistrationUrl.schema = Joi.object().keys({
  ownerUsername: Joi.string().required(),
  groupId: Joi.string().required(),
});

/**
 * Add group member.
 * @param {String} groupId the group id
 * @param {String} ownerUserToken the owner user token
 * @param {String} normalUserToken the normal user token
 * @returns {Promise} the promise result
 */
async function addGroupMember(groupId, ownerUserToken, normalUserToken) {
  try {
    // get normal user id
    const res = await request
      .get(`${config.GITLAB_API_BASE_URL}/user`)
      .set('Authorization', `Bearer ${normalUserToken}`)
      .end();
    const userId = res.body.id;
    if (!userId) {
      throw new errors.UnauthorizedError('Can not get user id from the normal user access token.');
    }

    // add user to group
    await request
      .post(`${config.GITLAB_API_BASE_URL}/groups/${groupId}/members`)
      .set('Authorization', `Bearer ${ownerUserToken}`)
      .send(`user_id=${userId}&access_level=${constants.GITLAB_DEFAULT_GROUP_ACCESS_LEVEL}`)
      .end();
    // return gitlab username
    return {username: res.body.username, id: res.body.id};
  } catch (err) {
    if (err instanceof errors.ApiError) {
      throw err;
    }
    throw helper.convertGitLabError(err, 'Failed to add group member');
  }
}

addGroupMember.schema = Joi.object().keys({
  groupId: Joi.string().required(),
  ownerUserToken: Joi.string().required(),
  normalUserToken: Joi.string().required(),
});

/**
 * Gets the user id by username
 * @param {string} username the username
 * @returns {number} the user id
 */
async function getUserIdByUsername(username) {
  try {
    // get current user
    const users = await request
      .get(`${config.GITLAB_API_BASE_URL}/users?username=${username}`)
      .end()
      .then((res) => res.body);
    if (!users || !users.length) {
      throw new errors.NotFoundError(`The user with username ${username} is not found on gitlab`);
    }
    return users[0].id;
  } catch (err) {
    throw helper.convertGitLabError(err, 'Failed to get detail about user from gitlab.');
  }
}

getUserIdByUsername.schema = Joi.object().keys({
  username: Joi.string().required(),
});

module.exports = {
  ensureOwnerUser,
  listOwnerUserGroups,
  getGroupRegistrationUrl,
  addGroupMember,
  getUserIdByUsername,
};

helper.buildService(module.exports);
