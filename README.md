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
3. GET /api/v1/gitlab/user/groups - List user Gitlab groups
4. PUT /api/v1/gitlab/groups/:id/memberships/:username - Add user to Gitlab group

## Configuration

The following config parameters are supported, they are defined in `config.js` and can be configured in system environment:


| Name                     |               Description               | Default                   |
| :----------------------- | :-------------------------------------: | :-----------------------: |
| PORT                     | The port the application will listen on |  3000                     |
| API_VERSION              |             The API version             |   v1                      |
| LOG_LEVEL                |              The log level              |  info                     |
| GITHUB_ACCOUNT_USERNAME  |     The username of github account      |                           |
| GITHUB_ACCOUNT_PASSWORD  |     The password of github account      |                           |
| GITLAB_API_BASE_URL      |     The Gitlab API base URL             | https://gitlab.com/api/v4 |
| GITLAB_API_PRIVATE_TOKEN |     The Gitlab API private token        |                           |



Normally you just need config the GITHUB_ACCOUNT_USERNAME, GITHUB_ACCOUNT_PASSWORD and GITLAB_API_PRIVATE_TOKEN:

```shell
export GITHUB_ACCOUNT_USERNAME=...
export GITHUB_ACCOUNT_PASSWORD=...
export GITLAB_API_PRIVATE_TOKEN=...
```

Or on windows:

```shell
set GITHUB_ACCOUNT_USERNAME=...
set GITHUB_ACCOUNT_PASSWORD=...
set GITLAB_API_PRIVATE_TOKEN=...
```

The Gitlab API private token can be got in this way:
- login into Gitlab
- click the upper right avatar, then click `Settings`
- Click the `Account` tab, there is `Private token` field there



## Unit Test

For Github:
Login into GitHub, create an organization and some teams:

Goto https://github.com/organizations/new to create an organization, fill required fields, choose "Free plan" is enough: http://take.ms/CwCgB

Then goto https://github.com/orgs/YourOrgName/new-team (**replay "YourOrgName" with your created org name**) to create some teams: http://take.ms/a3zvF

Now config your organization name in `tests/config.js`, `TEST_ORG` field.


For Gitlab:
- login into Gitlab
- click the upper right `+`, then click `New group`, fill in required fields to create group,
  multiple groups can be created similarly
- choose any created group name, configure it to `tests/config.js` GITLAB_TEST_GROUP_NAME field
- configure another Gitlab user name to `tests/config.js` GITLAB_TEST_USERNAME field,
  this user should be different than the admin user whose private token is used
- Note that the admin user should not own more than 100 groups, otherwise the test may not find out
  group of the configured group name
- Also note that the configured test user name should not be member of the configured group,
  if the user is already in the group, you may login into Gitlab as the test user, then leave the group



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

List user Github teams: http://take.ms/pouHQ

Then you need config the Github teamId (the id of team you just created in "Unit Test" step, you can find the team id by listing user teams) and username (you can use your Github username) in postman environment, then you can add user to team: http://take.ms/0QZ9F 


Notes for Gitlab tests:
- after running the `Gitlab - List user groups` API, you may choose any group, configure its group id to environment variable `gitlabGroupId`
- the configured environment variable `gitlabUsername` should be another user different than the admin, and s/he is not in the configured group

