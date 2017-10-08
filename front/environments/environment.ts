// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  api: {
    base: 'http://localhost:3000/api/v1',
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
