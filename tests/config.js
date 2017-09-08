/*
 * Copyright (c) 2017 TopCoder, Inc. All rights reserved.
 */

/**
 * Define test config.
 *
 * @author TCSCODER
 * @version 1.0
 */
module.exports = {
  // set to name of organization of configured github admin
  TEST_ORG: 'my-test-organization-123',
  // gitlab group name to add user to,
  // the configured gitlab admin should own this group
  GITLAB_TEST_GROUP_NAME: 'my-testing-group2',
  // gitlab user name to add to the above test group,
  // the user must NOT be a member of the group
  GITLAB_TEST_USERNAME: 'guanpeiyong',
};
