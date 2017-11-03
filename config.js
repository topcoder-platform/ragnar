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
  GITHUB_OWNER_CALLBACK_URL: process.env.GITHUB_OWNER_CALLBACK_URL || '/app/github-owner-login',
  OWNER_USER_LOGIN_SUCCESS_URL: process.env.OWNER_USER_LOGIN_SUCCESS_URL || '/app/github-owner',
  USER_ADDED_TO_TEAM_SUCCESS_URL: process.env.USER_ADDED_TO_TEAM_SUCCESS_URL || '/app/github-members/added',
  GITLAB_API_BASE_URL: process.env.GITLAB_API_BASE_URL || 'https://gitlab.com/api/v4',
  GITLAB_CLIENT_ID: process.env.GITLAB_CLIENT_ID,
  GITLAB_CLIENT_SECRET: process.env.GITLAB_CLIENT_SECRET,
  GITLAB_OWNER_CALLBACK_URL: process.env.GITLAB_OWNER_CALLBACK_URL || '/app/gitlab-owner-login',
  GITLAB_OWNER_USER_LOGIN_SUCCESS_URL:
    process.env.GITLAB_OWNER_USER_LOGIN_SUCCESS_URL || '/app/gitlab-owner',
  GITLAB_USER_ADDED_TO_GROUP_SUCCESS_URL:
    process.env.GITLAB_USER_ADDED_TO_GROUP_SUCCESS_URL || '/app/gitlab-members/added',

  TC_LOGIN_URL: process.env.TC_LOGIN_URL || '/app/tclogin',
  TC_AUTHN_URL: process.env.TC_AUTHN_URL || 'https://topcoder-dev.auth0.com/oauth/ro',
  TC_AUTHN_REQUEST_BODY: {
    client_id: process.env.TC_CLIENT_ID || 'JFDo7HMkf0q2CkVFHojy3zHWafziprhT',
    sso: false,
    scope: 'openid profile offline_access',
    response_type: 'token',
    connection: process.env.TC_CLIENT_V2CONNECTION || 'TC-User-Database',
    grant_type: 'password',
    device: 'Browser',
  },
};
