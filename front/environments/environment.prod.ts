export const environment = {
  production: true,
  api: {
    base: 'http://localhost:3000/api/v1',
    admin: '/admin/login',
    users: '/admin/users',
    ownerLoginCB: '/github/owneruser/callback',
    ownerLogin: '/github/owneruser/login',
    ownerTeams: '/github/owneruser/teams',
    ownerTeamUrl: '/github/teams/:teamid:/registrationurl'
  }
};
