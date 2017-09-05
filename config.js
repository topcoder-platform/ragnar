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
  GITHUB_ACCOUNT: {
    username: process.env.GITHUB_ACCOUNT_USERNAME,
    password: process.env.GITHUB_ACCOUNT_PASSWORD,
  },
  GITLAB_API_BASE_URL: process.env.GITLAB_API_BASE_URL || 'https://gitlab.com/api/v4',
  GITLAB_API_PRIVATE_TOKEN: process.env.GITLAB_API_PRIVATE_TOKEN,
};
