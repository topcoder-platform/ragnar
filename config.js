/*
 * Copyright (c) 2017 TopCoder, Inc. All rights reserved.
 */

/**
 * Define config.
 *
 * @author TCSCODER
 * @version 1.0
 */
module.exports = {
  PORT: process.env.PORT || 3000, // eslint-disable-line no-magic-numbers
  API_VERSION: process.env.API_VERSION || 'v1',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/ragnar',
  PASSWORD_HASH_SALT_LENGTH: process.env.PASSWORD_HASH_SALT_LENGTH || 10, // eslint-disable-line no-magic-numbers
  SESSION_SECRET: process.env.SESSION_SECRET || 'kjsdfkj34857',
  JWT_SECRET: process.env.JWT_SECRET || 'hjijfvbw859',
  // a string of time span, see https://github.com/zeit/ms
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || '2 days',
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  // used as base to construct various URLs
  WEBSITE: process.env.WEBSITE || 'http://localhost:3000',
  OWNER_USER_LOGIN_SUCCESS_URL: process.env.OWNER_USER_LOGIN_SUCCESS_URL || '/owner-user-login-success.html',
  USER_ADDED_TO_TEAM_SUCCESS_URL: process.env.USER_ADDED_TO_TEAM_SUCCESS_URL || '/user-added-to-team-success.html',
};
