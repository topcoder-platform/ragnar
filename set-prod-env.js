const {writeFile} = require('fs');

const targetPath = './front/environments/environment.prod.ts';

const envConfigFile = `
export const environment = {
  production: true,
  api: {
    base: '${process.env.WEBSITE}',
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
`;

writeFile(targetPath, envConfigFile, (err) => {
  if (err) {
    console.log('Error during environment variable generation');
    console.error(err);
  } else {
    console.log('Environment file for production generated successfully');
  }
});
