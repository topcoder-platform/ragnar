/*
 * Copyright (c) 2017 TopCoder, Inc. All rights reserved.
 */

/**
 * This controller exposes TC user endpoints.
 *
 * @author TCSCODER
 * @version 1.0
 */
const helper = require('../common/helper');
const TCUserService = require('../services/TCUserService');

/**
 * TC user login.
 * @param {Object} req the request
 * @returns {Object} the login result
 */
async function login(req) {
  await TCUserService.login(req.body);
  // login success
  req.session.tcLoginDone = true;
  req.session.tcUsername = req.body.username;
  return {returnUrl: req.session.tcLoginReturnUrl};
}

/**
 * Get TC user mapping details.
 * @param {Object} req the request
 * @returns {Object} the operation result
 */
async function getUserMapping(req) {
  return await TCUserService.getUserMapping(req.query);
}

module.exports = {
  login,
  getUserMapping,
};

helper.buildController(module.exports);
