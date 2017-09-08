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
  '/admin/login': {
    post: {
      controller: 'AdminController',
      method: 'login',
    },
  },
  '/admin/users': {
    post: {
      controller: 'AdminController',
      method: 'saveUser',
      isAdmin: true,
    },
  },

  '/github/owneruser/login': {
    get: {
      controller: 'GithubController',
      method: 'ownerUserLogin',
    },
  },
  '/github/owneruser/callback': {
    get: {
      controller: 'GithubController',
      method: 'ownerUserLoginCallback',
    },
  },

  '/github/owneruser/teams': {
    get: {
      controller: 'GithubController',
      method: 'listOwnerUserTeams',
    },
  },
  '/github/teams/:id/registrationurl': {
    get: {
      controller: 'GithubController',
      method: 'getTeamRegistrationUrl',
    },
  },
  '/github/teams/registration/:identifier': {
    get: {
      controller: 'GithubController',
      method: 'addUserToTeam',
    },
  },
  '/github/normaluser/callback': {
    get: {
      controller: 'GithubController',
      method: 'addUserToTeamCallback',
    },
  },
};
