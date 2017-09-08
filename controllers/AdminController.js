/*
 * Copyright (c) 2017 TopCoder, Inc. All rights reserved.
 */

/**
 * This controller exposes admin endpoints.
 *
 * @author TCSCODER
 * @version 1.0
 */
const helper = require('../common/helper');
const AdminService = require('../services/AdminService');

/**
 * Admin login.
 * @param {Object} req the request
 * @returns {Object} the login result
 */
async function login(req) {
  return await AdminService.login(req.body);
}

/**
 * Save user. If the user is not present, then it will be created, otherwise updated.
 * @param {Object} req the request
 * @returns {Object} the operation result
 */
async function saveUser(req) {
  return await AdminService.saveUser(req.body);
}

module.exports = {
  login,
  saveUser,
};

helper.buildController(module.exports);
