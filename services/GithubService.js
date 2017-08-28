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

const github = new GitHub(config.GITHUB_ACCOUNT);

/**
 * List teams of user.
 * @param {Number} page the page number (default to be 1). Must be >= 1
 * @param {Number} perPage the page size (default to be constants.DEFAULT_PER_PAGE). Must be within range [1, constants.MAX_PER_PAGE]
 * @returns {Promise} the promise result
 */
async function listUserTeams(page = 1, perPage = constants.DEFAULT_PER_PAGE) {
  try {
    const user = github.getUser(config.GITHUB_ACCOUNT.username);
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

listUserTeams.schema = Joi.object().keys({
  page: Joi.number().integer().min(1).optional(),
  perPage: Joi.number().integer().min(1).max(constants.MAX_PER_PAGE)
    .optional(),
});

/**
 * Add team member.
 * @param {String} teamId the team id
 * @param {String} username the username to add to team
 * @returns {Promise} the promise result
 */
async function addTeamMember(teamId, username) {
  try {
    const team = github.getTeam(teamId);
    const response = await team.addMembership(username);
    return response.data;
  } catch (err) {
    throw helper.convertGitHubError(err, 'Failed to add team member');
  }
}

addTeamMember.schema = Joi.object().keys({
  teamId: Joi.string().required(),
  username: Joi.string().required(),
});

module.exports = {
  listUserTeams,
  addTeamMember,
};

helper.buildService(module.exports);
