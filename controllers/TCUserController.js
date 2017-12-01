/*
 * Copyright (c) 2017 TopCoder, Inc. All rights reserved.
 */

/**
 * This controller exposes TC user endpoints.
 *
 * @author TCSCODER
 * @version 1.0
 */
const config = require('../config');
const helper = require('../common/helper');
const TCUserService = require('../services/TCUserService');

/**
 * TC user login.
 * @param {Object} req the request
 * @returns {Object} the login result
 */
async function login(req, res) {
  const cookies = req.cookies;
  if (cookies && cookies.tcjwt) {
    const handle = await TCUserService.getHandle(cookies.tcjwt);
    // login success
    req.session.tcLoginDone = true;
    req.session.tcUsername = handle;
    return res.redirect(req.session.tcLoginReturnUrl);
  }
  return res.redirect(config.TC_LOGIN_URL);
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
