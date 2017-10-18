export const environment = {
  production: true,
  api: {
    base: 'http://ragnar.topcoder.com/api/v1',
    admin: '/admin/login',
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
