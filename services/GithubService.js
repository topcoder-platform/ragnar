/*
 * Copyright (c) 2017 TopCoder, Inc. All rights reserved.
 */

/**
 * This service will provide Github operations.
 *
 * @author TCSCODER
 * @version 1.0
 */
const GitHub = require('github-api');
const Joi = require('joi');
const config = require('../config');
const constants = require('../common/constants');
const helper = require('../common/helper');
const User = require('../models').User;
const OwnerUserTeam = require('../models').OwnerUserTeam;
const errors = require('../common/errors');


/**
 * Ensure the owner user is in database.
 * @param {String} token the access token of owner user
 * @returns {Promise} the promise result of found owner user
 */
async function ensureOwnerUser(token) {
  let username;
  try {
    const github = new GitHub({token});
    const user = await github.getUser().getProfile();
    username = user.data.login;
  } catch (err) {
    throw helper.convertGitHubError(err, 'Failed to ensure valid owner user.');
  }
  return await helper.ensureExists(User,
    {username, type: constants.USER_TYPES.GITHUB, role: constants.USER_ROLES.OWNER});
}

ensureOwnerUser.schema = Joi.object().keys({
  token: Joi.string().required(),
});


/**
 * List teams of owner user.
 * @param {String} token the access token of owner user
 * @param {Number} page the page number (default to be 1). Must be >= 1
 * @param {Number} perPage the page size (default to be constants.DEFAULT_PER_PAGE). Must be within range [1, constants.MAX_PER_PAGE]
 * @returns {Promise} the promise result
 */
async function listOwnerUserTeams(token, page = 1, perPage = constants.DEFAULT_PER_PAGE) {
  try {
    const github = new GitHub({token});
    const user = github.getUser();
    const response = await user._request('GET', '/user/teams', {page, per_page: perPage});

    const result = {
      page,
      perPage,
      lastPage: 1,
      teams: response.data,
    };

    if (response.headers.link) {
      const links = response.headers.link.split(/\s*,\s*/);
      links.reduce((_result, link) => {
        if (link.endsWith('rel="last"')) {
          _result.lastPage = (link.match(/.*[?&]page=(\d+).*/) || [])[1] || 1;
        }
        return _result;
      }, result);
      result.lastPage = parseInt(result.lastPage, 10);
    }

    return result;
  } catch (err) {
    throw helper.convertGitHubError(err, 'Failed to list user teams');
  }
}

listOwnerUserTeams.schema = Joi.object().keys({
  token: Joi.string().required(),
  page: Joi.number().integer().min(1).optional(),
  perPage: Joi.number().integer().min(1).max(constants.MAX_PER_PAGE)
    .optional(),
});

/**
 * Get owner user team registration URL.
 * @param {String} token the access token of owner user
 * @param {String} ownerUsername the owner user name
 * @param {String} teamId the team id
 * @returns {Promise} the promise result
 */
async function getTeamRegistrationUrl(token, ownerUsername, teamId) {
  // check whether owner user can add team member to the team
  let membershipData;
  try {
    const github = new GitHub({token});
    const team = github.getTeam(teamId);
    const response = await team.getMembership(ownerUsername);
    membershipData = response.data;
  } catch (err) {
    throw helper.convertGitHubError(err, 'Failed to get team membership details.');
  }
  if (!membershipData || membershipData.role !== 'maintainer' || membershipData.state !== 'active') {
    throw new errors.ForbiddenError('The owner user can not add member to the team.');
  }

  // generate identifier
  const identifier = helper.generateIdentifier();

  // create owner user team
  await OwnerUserTeam.create({
    ownerUsername,
    type: constants.USER_TYPES.GITHUB,
    teamId,
    ownerToken: token,
    identifier,
  });

  // construct URL
  const url = `${config.WEBSITE}/api/${config.API_VERSION}/github/teams/registration/${identifier}`;
  return {url};
}

getTeamRegistrationUrl.schema = Joi.object().keys({
  token: Joi.string().required(),
  ownerUsername: Joi.string().required(),
  teamId: Joi.string().required(),
});

/**
 * Add team member.
 * @param {String} teamId the team id
 * @param {String} ownerUserToken the owner user token
 * @param {String} normalUserToken the normal user token
 * @returns {Promise} the promise result
 */
async function addTeamMember(teamId, ownerUserToken, normalUserToken) {
  try {
    // get normal user name
    const githubNormalUser = new GitHub({token: normalUserToken});
    const normalUser = await githubNormalUser.getUser().getProfile();
    const username = normalUser.data.login;

    // add normal user to team
    const github = new GitHub({token: ownerUserToken});
    const team = github.getTeam(teamId);
    await team.addMembership(username);
    // return github username
    return username;
  } catch (err) {
    throw helper.convertGitHubError(err, 'Failed to add team member');
  }
}

addTeamMember.schema = Joi.object().keys({
  teamId: Joi.string().required(),
  ownerUserToken: Joi.string().required(),
  normalUserToken: Joi.string().required(),
});

module.exports = {
  ensureOwnerUser,
  listOwnerUserTeams,
  getTeamRegistrationUrl,
  addTeamMember,
};

helper.buildService(module.exports);
