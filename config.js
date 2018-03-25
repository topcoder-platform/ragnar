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
  PORT: process.env.PORT || 80, // eslint-disable-line no-magic-numbers
  API_VERSION: process.env.API_VERSION || 'v1',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/ragnar',
  PASSWORD_HASH_SALT_LENGTH: process.env.PASSWORD_HASH_SALT_LENGTH || 10, // eslint-disable-line no-magic-numbers
  SESSION_SECRET: process.env.SESSION_SECRET || 'kjsdfkj34857',
  JWT_SECRET: process.env.JWT_SECRET || 'hjijfvbw859',
  // a string of time span, see https://github.com/zeit/ms
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || '2 days',
  GITHUB_CLIENT_ID: 'c693c425f89405b4caa3',
  GITHUB_CLIENT_SECRET: '6ad6f613878d1afb91a388a51c1f36a1b6a2abff',
  // used as base to construct various URLs
  WEBSITE: process.env.WEBSITE || 'http://ragnarlocal.topcoder.com',
  GITHUB_OWNER_CALLBACK_URL: process.env.GITHUB_OWNER_CALLBACK_URL || '/app/github-owner-login',
  OWNER_USER_LOGIN_SUCCESS_URL: process.env.OWNER_USER_LOGIN_SUCCESS_URL || '/app/github-owner',
  USER_ADDED_TO_TEAM_SUCCESS_URL: process.env.USER_ADDED_TO_TEAM_SUCCESS_URL || '/app/github-members/added',
  GITLAB_API_BASE_URL: process.env.GITLAB_API_BASE_URL || 'https://gitlab.com/api/v4',
  GITLAB_CLIENT_ID: '541a097899ce0c51ec90f15f23c0c890a7de367038f07b38b63e896b00cd0ef1',
  GITLAB_CLIENT_SECRET: 'd0bf50d01a38409c01fa475b7df3349e64396888f9703d37ff8e7cb1bef46151',
  GITLAB_OWNER_CALLBACK_URL: process.env.GITLAB_OWNER_CALLBACK_URL || '/app/gitlab-owner-login',
  GITLAB_OWNER_USER_LOGIN_SUCCESS_URL:
    process.env.GITLAB_OWNER_USER_LOGIN_SUCCESS_URL || '/app/gitlab-owner',
  GITLAB_USER_ADDED_TO_GROUP_SUCCESS_URL:
    process.env.GITLAB_USER_ADDED_TO_GROUP_SUCCESS_URL || '/app/gitlab-members/added',
  TC_LOGIN_URL: process.env.TC_LOGIN_URL || 'https://accounts.topcoder.com/member',
  TC_LOGIN_CALLBACK_URL: '/api/v1/tclogin',
  TC_USER_PROFILE_URL: process.env.TC_USER_PROFILE_URL || 'http://api.topcoder.com/v2/user/profile',
};
