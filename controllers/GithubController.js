/*
 * Copyright (c) 2017 TopCoder, Inc. All rights reserved.
 */

/**
 * This controller exposes Github REST endpoints.
 *
 * @author TCSCODER
 * @version 1.0
 */
const helper = require('../common/helper');
const GithubService = require('../services/GithubService');

/**
 * List teams of user.
 * @param {Object} req the request
 * @returns {Object} the user teams
 */
async function listUserTeams(req) {
  return await GithubService.listUserTeams(req.query.page, req.query.perPage);
}

/**
 * Add team member.
 * @param {Object} req the request
 * @returns {Object} the operation result
 */
async function addTeamMember(req) {
  return await GithubService.addTeamMember(req.params.id, req.params.username);
}

module.exports = {
  listUserTeams,
  addTeamMember,
};

helper.buildController(module.exports);
