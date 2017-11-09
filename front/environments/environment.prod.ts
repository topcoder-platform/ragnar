// DONT EDIT THIS FILE. The contents of this file are overwritten during deployment
// If you need to add a configuration here, add it instead to ROOT/set-prod-env.js

export const environment = {
  production: true,
  api: {
    base: 'undefined',
    admin: '/admin/login',
    tcLogin: '/tclogin',
    users: '/admin/users',
    githubOwnerLoginCB: '/github/owneruser/callback',
    githubOwnerLogin: '/github/owneruser/login',
    githubOwnerTeams: '/github/owneruser/teams',
    githubOwnerTeamUrl: '/github/teams/:teamid:/registrationurl',
    gitlabOwnerLoginCB: '/gitlab/owneruser/callback',
    gitlabOwnerLogin: '/gitlab/owneruser/login',
    gitlabOwnerGroups: '/gitlab/owneruser/groups',
    gitlabOwnerGroupUrl: '/gitlab/groups/:groupid:/registrationurl'
  }
};
