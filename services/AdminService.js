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
  const user = await User.findOne({username: body.username, type: body.type});
  if (!user) {
    return await User.create(body);
  }
  _.assign(user, body);
  return await user.save();
}

saveUser.schema = Joi.object().keys({
  body: Joi.object().keys({
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
