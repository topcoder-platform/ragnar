// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  api: {
    base: 'https://lagertha-dev.herokuapp.com/api/v1',
    admin: '/admin/login',
    users: '/admin/users',
    ownerLoginCB: '/github/owneruser/callback',
    ownerLogin: '/github/owneruser/login',
    ownerTeams: '/github/owneruser/teams',
    ownerTeamUrl: '/github/teams/:teamid:/registrationurl'
  }
};
