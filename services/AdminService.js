/*
 * Copyright (c) 2017 TopCoder, Inc. All rights reserved.
 */

/**
 * This service will provide admin operations.
 *
 * @author TCSCODER
 * @version 1.0
 */
const Joi = require('joi');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('../config');
const constants = require('../common/constants');
const errors = require('../common/errors');
const helper = require('../common/helper');
const User = require('../models').User;
const Admin = require('../models').Admin;
const gitHubService = require('./GithubService');
const gitlabService = require('./GitlabService');
/**
 * Admin login.
 * @param {Object} body the request body
 * @returns {Promise} the promise result containing token to access other admin APIs
 */
async function login(body) {
  const admin = await helper.ensureExists(Admin, {username: body.username});
  const isMatch = await helper.validateHash(body.password, admin.password);
  if (!isMatch) {
    throw new errors.UnauthorizedError('Login failed.', 'Password is wrong.');
  }
  // generate JWT token
  const token = jwt.sign({username: body.username}, config.JWT_SECRET, {expiresIn: config.JWT_EXPIRATION});
  return {username: body.username, token};
}

login.schema = Joi.object().keys({
  body: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }).required(),
});

/**
 * Save user. If the user is not present, then it will be created, otherwise updated.
 * @param {Object} body the request body
 * @returns {Promise} the promise result of saved user
 */
async function saveUser(body) {
  let userId;
  const topcoderUsername = body.topcoderUsername.toLowerCase();
  if (body.type === constants.USER_TYPES.GITHUB) {
    userId = await gitHubService.getUserIdByUsername(body.username);
  } else {
    userId = await gitlabService.getUserIdByUsername(body.username);
  }
  // ensure no two user's are assigned same topcoder handle for same provider
  let user = await User.findOne({topcoderUsername, type: body.type});
  if (user && user.userProviderId !== userId) {
    throw new errors.ValidationError(`The topcoder handle '${body.topcoderUsername}' is already mapped to username '${user.username}' for ${body.type}.`);
  }
  // if check user with service provider already exits
  if (!user) {
    user = await User.findOne({userProviderId: userId, type: body.type});
  }
  body.topcoderUsername = topcoderUsername;
  if (!user) {
    return await User.create({...body, userProviderId: userId});
  }
  _.assign(user, {...body, userProviderId: userId});
  return await user.save();
}

saveUser.schema = Joi.object().keys({
  body: Joi.object().keys({
    topcoderUsername: Joi.string().required(),
    username: Joi.string().required(),
    role: Joi.string().valid(_.values(constants.USER_ROLES)).required(),
    type: Joi.string().valid(_.values(constants.USER_TYPES)).required(),
  }).required(),
});


module.exports = {
  login,
  saveUser,
};

helper.buildService(module.exports);
