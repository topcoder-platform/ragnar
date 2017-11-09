/*
 * Copyright (c) 2017 TopCoder, Inc. All rights reserved.
 */

/**
 * This service will provide TC user operations.
 *
 * @author TCSCODER
 * @version 1.0
 */
const Joi = require('joi');
const _ = require('lodash');
const superagent = require('superagent');
const superagentPromise = require('superagent-promise');
const config = require('../config');
const errors = require('../common/errors');
const helper = require('../common/helper');
const UserMapping = require('../models').UserMapping;

const request = superagentPromise(superagent, Promise);


/**
 * TC user login.
 * @param {Object} body the request body
 */
async function login(body) {
  const result = await request
    .post(config.TC_AUTHN_URL)
    .set('cache-control', 'no-cache')
    .set('content-type', 'application/json')
    .send(_.assignIn({}, config.TC_AUTHN_REQUEST_BODY, body))
    .end();

  if (!result.body.id_token || !result.body.refresh_token) {
    throw new errors.UnauthorizedError('Login Failed.', 'Failed to do TopCoder V2 authentication.');
  }
}

login.schema = Joi.object().keys({
  body: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }).required(),
});

/**
 * Get user mapping details.
 * @param {Object} query the query parameters
 * @returns {Promise} the promise result of user mapping details
 */
async function getUserMapping(query) {
  // at least one of the parameters should ge provided
  if (!query.topcoderUsername && !query.githubUsername && !query.gitlabUsername) {
    throw new errors.ValidationError('Invalid Input.',
      'At least one of topcoderUsername/gitlabUsername/githubUsername should be provided.');
  }

  return await helper.ensureExists(UserMapping, query);
}

getUserMapping.schema = Joi.object().keys({
  query: Joi.object().keys({
    topcoderUsername: Joi.string(),
    githubUsername: Joi.string(),
    gitlabUsername: Joi.string(),
  }).required(),
});


module.exports = {
  login,
  getUserMapping,
};

helper.buildService(module.exports);
