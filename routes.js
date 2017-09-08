/*
 * Copyright (c) 2017 TopCoder, Inc. All rights reserved.
 */

/**
 * Contains all routes.
 *
 * @author TCSCODER
 * @version 1.0
 */
module.exports = {
  '/github/user/teams': {
    get: {
      controller: 'GithubController',
      method: 'listUserTeams',
    },
  },
  '/github/teams/:id/memberships/:username': {
    put: {
      controller: 'GithubController',
      method: 'addTeamMember',
    },
  },
  '/gitlab/user/groups': {
    get: {
      controller: 'GitlabController',
      method: 'listUserGroups',
    },
  },
  '/gitlab/groups/:id/memberships/:username': {
    post: {
      controller: 'GitlabController',
      method: 'addGroupMember',
    },
  },
};
