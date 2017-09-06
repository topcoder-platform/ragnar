/*
 * Copyright (c) 2017 TopCoder, Inc. All rights reserved.
 */

/**
 * Define constants.
 *
 * @author TCSCODER
 * @version 1.0
 */

// The default page size
const DEFAULT_PER_PAGE = 30;

// The max page size
const MAX_PER_PAGE = 100;

// The service error
const SERVICE_ERROR = 'SERVICE_ERROR';

// The service error status
const SERVICE_ERROR_STATUS = 500;

// The default page size for Gitlab API
const GITLAB_DEFAULT_PER_PAGE = 20;

// The max page size for Gitlab API
const GITLAB_MAX_PER_PAGE = 100;

// The gitlab default group member access level,
// the access level can be: 10 - GUEST, 20 - REPORTER, 30 - DEVELOPER, 40 - MASTER, 50 - OWNER
const GITLAB_DEFAULT_GROUP_ACCESS_LEVEL = 30;

module.exports = {
  DEFAULT_PER_PAGE,
  MAX_PER_PAGE,
  SERVICE_ERROR,
  SERVICE_ERROR_STATUS,
  GITLAB_DEFAULT_PER_PAGE,
  GITLAB_MAX_PER_PAGE,
  GITLAB_DEFAULT_GROUP_ACCESS_LEVEL,
};
