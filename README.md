## Requirements

- Nodejs 8 is required


## Install dependencies

```shell
npm install
```

## Source code lint

eslint is used to lint the javascript source code:

```shell
npm run lint
```

There should be no errors or warnings.

## Endpoints

1. GET /api/v1/github/user/teams - List user teams
2. PUT /api/v1/github/teams/:id/memberships/:username - Add user to team

## Configuration

The following config parameters are supported, they are defined in `config.js` and can be configured in system environment:


| Name                    |               Description               | Default |
| :---------------------- | :-------------------------------------: | :-----: |
| PORT                    | The port the application will listen on |  3000   |
| API_VERSION             |             The API version             |   v1    |
| LOG_LEVEL               |              The log level              |  info   |
| GITHUB_ACCOUNT_USERNAME |     The username of github account      |         |
| GITHUB_ACCOUNT_PASSWORD |     The password of github account      |         |



Normally you just need config the GITHUB_ACCOUNT_USERNAME and GITHUB_ACCOUNT_PASSWORD:

```shell
export GITHUB_ACCOUNT_USERNAME=...
export GITHUB_ACCOUNT_PASSWORD=...
```

Or on windows:

```shell
set GITHUB_ACCOUNT_USERNAME=...
set GITHUB_ACCOUNT_PASSWORD=...
```



## Unit Test

Login into GitHub, create an organization and some teams:

Goto https://github.com/organizations/new to create an organization, fill required fields, choose "Free plan" is enough: http://take.ms/CwCgB

Then goto https://github.com/orgs/YourOrgName/new-team (**replay "YourOrgName" with your created org name**) to create some teams: http://take.ms/a3zvF

Now config your organization name in `tests/config.js`, `TEST_ORG` field.

Then run:

```shell
npm test
```



## Local Setup

```shell
npm start
```

Server should be started at port 3000.



## Postman

Import docs/Ragnar.postman_collection.json and docs/Ragnar.postman_environment.json to Postman.

List user teams: http://take.ms/pouHQ

Then you need config the teamId (the id of team you just created in "Unit Test" step, you can find the team id by listing user teams) and username (you can use your Github username) in postman environment, then you can add user to team: http://take.ms/0QZ9F 