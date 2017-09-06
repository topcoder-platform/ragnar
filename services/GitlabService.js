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

const request = superagentPromise(superagent, Promise);

/**
 * List groups of user.
 * @param {Number} page the page number (default to be 1). Must be >= 1
 * @param {Number} perPage the page size (default to be constants.GITLAB_DEFAULT_PER_PAGE).
 *   Must be within range [1, constants.GITLAB_MAX_PER_PAGE]
 * @returns {Promise} the promise result
 */
async function listUserGroups(page = 1, perPage = constants.GITLAB_DEFAULT_PER_PAGE) {
  try {
    const response = await request
      .get(`${config.GITLAB_API_BASE_URL}/groups`)
      .query({page, per_page: perPage, owned: true})
      .set('PRIVATE-TOKEN', config.GITLAB_API_PRIVATE_TOKEN)
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

listUserGroups.schema = Joi.object().keys({
  page: Joi.number().integer().min(1).optional(),
  perPage: Joi.number().integer().min(1).max(constants.GITLAB_MAX_PER_PAGE)
    .optional(),
});

/**
 * Add group member.
 * @param {String} groupId the group id
 * @param {String} username the username to add to group
 * @returns {Promise} the promise result
 */
async function addGroupMember(groupId, username) {
  try {
    // find user by username
    const users = await request
      .get(`${config.GITLAB_API_BASE_URL}/users`)
      .query({username})
      .set('PRIVATE-TOKEN', config.GITLAB_API_PRIVATE_TOKEN)
      .end()
      .then((res) => res.body);
    if (!users || users.length === 0) {
      throw new errors.NotFoundError('User Not Found.', `User of username ${username} is not found.`);
    }
    const userId = users[0].id;

    // add user to group
    return await request
      .post(`${config.GITLAB_API_BASE_URL}/groups/${groupId}/members`)
      .set('PRIVATE-TOKEN', config.GITLAB_API_PRIVATE_TOKEN)
      .send(`user_id=${userId}&access_level=${constants.GITLAB_DEFAULT_GROUP_ACCESS_LEVEL}`)
      .end()
      .then((res) => res.body);
  } catch (err) {
    if (err instanceof errors.ApiError) {
      throw err;
    }
    throw helper.convertGitLabError(err, 'Failed to add group member');
  }
}

addGroupMember.schema = Joi.object().keys({
  groupId: Joi.string().required(),
  username: Joi.string().required(),
});

module.exports = {
  listUserGroups,
  addGroupMember,
};

helper.buildService(module.exports);
