/*
 * Copyright (c) 2017 TopCoder, Inc. All rights reserved.
 */

/**
 * This file defines helper methods.
 *
 * @author TCSCODER
 * @version 1.0
 */
const util = require('util');
const _ = require('lodash');
const Joi = require('joi');
const getParams = require('get-parameter-names');
const config = require('../config');
const logger = require('./logger');
const errors = require('./errors');
const constants = require('./constants');

/**
 * Convert array with arguments to object
 * @param {Array} params the name of parameters
 * @param {Array} arr the array with values
 * @returns {Object} the combined object
 * @private
 */
function _combineObject(params, arr) {
  const ret = {};
  _.forEach(arr, (arg, i) => {
    ret[params[i]] = arg;
  });
  return ret;
}

/**
 * Decorate all functions of a service and log debug information if DEBUG is enabled
 * @param {Object} service the service
 * @private
 */
function _decorateWithLogging(service) {
  if (config.LOG_LEVEL !== 'debug') {
    return;
  }
  _.forEach(service, (method, name) => {
    const params = method.params || getParams(method);
    service[name] = async function serviceMethodWithLogging(...args) {
      logger.debug(`ENTER ${name}`);
      logger.debug('input arguments');
      logger.debug(util.inspect(_combineObject(params, args)));
      try {
        const result = await method.apply(this, args);
        logger.debug(`EXIT ${name}`);
        logger.debug('output arguments');
        logger.debug(util.inspect(result));
        return result;
      } catch (e) {
        logger.logFullError(e, name);
        throw e;
      }
    };
  });
}

/**
 * Decorate all functions of a service and validate input values
 * and replace input arguments with sanitized result form Joi
 * Service method must have a `schema` property with Joi schema
 * @param {Object} service the service
 * @private
 */
function _decorateWithValidators(service) {
  _.forEach(service, (method, name) => {
    if (!method.schema) {
      return;
    }
    const params = getParams(method);
    service[name] = async function serviceMethodWithValidation(...args) {
      const value = _combineObject(params, args);
      const normalized = Joi.attempt(value, method.schema, {abortEarly: false});
      // Joi will normalize values
      // for example string number '1' to 1
      // if schema type is number
      const newArgs = _.map(params, (param) => normalized[param]);
      return await method.apply(this, newArgs);
    };
    service[name].params = params;
  });
}

/**
 * Apply logger and validation decorators
 * @param {Object} service the service to wrap
 */
function buildService(service) {
  _decorateWithValidators(service);
  _decorateWithLogging(service);
}

/**
 * Apply response json render and error handler.
 * @param {Object} controller the controller to wrap
 */
function buildController(controller) {
  _.forEach(controller, (method, name) => {
    controller[name] = (req, res, next) => {
      // Make sure to `.catch()` any errors and pass them along to the `next()`
      // middleware in the chain, in this case the error handler.
      method(req, res).then((result) => res.json(result)).catch(next);
    };
  });
}

/**
 * Convert github api error.
 * @param {Error} err the github api error
 * @param {String} message the error message
 * @returns {Error} converted error
 */
function convertGitHubError(err, message) {
  const apiError = new errors.ApiError(
    _.get(err, 'response.status', constants.SERVICE_ERROR_STATUS),
    _.get(err, 'response.statusText', constants.SERVICE_ERROR),
    `${message}. ${err.message}. Detail: ${_.get(err, 'response.data.message')}`);
  return apiError;
}

module.exports = {
  buildService,
  buildController,
  convertGitHubError,
};
