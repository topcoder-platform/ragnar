/*
 * Copyright (c) 2017 TopCoder, Inc. All rights reserved.
 */

/**
 * This controller exposes Gitlab REST endpoints.
 *
 * @author TCSCODER
 * @version 1.0
 */
const helper = require('../common/helper');
const GitlabService = require('../services/GitlabService');

/**
 * List groups of user.
 * @param {Object} req the request
 * @returns {Object} the user groups
 */
async function listUserGroups(req) {
  return await GitlabService.listUserGroups(req.query.page, req.query.perPage);
}

/**
 * Add group member.
 * @param {Object} req the request
 * @returns {Object} the operation result
 */
async function addGroupMember(req) {
  return await GitlabService.addGroupMember(req.params.id, req.params.username);
}

module.exports = {
  listUserGroups,
  addGroupMember,
};

helper.buildController(module.exports);
