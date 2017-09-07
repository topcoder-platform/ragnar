## Requirements

- Nodejs 8 is required
- MongoDB 3.2

## Install dependencies

```shell
npm install
```

## Source code lint

eslint is used to lint the javascript source code:

```shell
npm run lint
```

## Endpoints

- POST /admin/login - admin login
- POST /admin/users - save user by admin, e.g. admin uses this API to create owner user
- GET /github/owneruser/login - owner user login, using GitHub OAuth
- GET /github/owneruser/callback - owner user login OAuth callback
- GET /github/owneruser/teams - owner user views his/her teams
- GET /github/teams/:id/registrationurl - owner user creates a registration URL for his/her team
- GET /github/teams/registration/:identifier - normal user registers a team via this API, it will do GitHub OAuth
- GET /github/normaluser/callback - normal user GitHub OAuth callback


## Configuration

The following config parameters are supported, they are defined in `config.js` and can be configured in system environment:


| Name                           | Description                                | Default                          |
| :----------------------------- | :----------------------------------------: | :------------------------------: |
| PORT                           | the port the application will listen on    |  3000                            |
| API_VERSION                    | the API version                            |   v1                             |
| LOG_LEVEL                      | the log level                              |  info                            |
| MONGODB_URI                    | the MongoDB URI                            | mongodb://localhost:27017/ragnar |
| PASSWORD_HASH_SALT_LENGTH      | the password hash salt length              | 10                               |
| SESSION_SECRET                 | the session secret                         | kjsdfkj34857                     |
| JWT_SECRET                     | the JWT secret                             | hjijfvbw859                      |
| JWT_EXPIRATION                 | a string of time span                      | 2 days                           |
| GITHUB_CLIENT_ID               | the GitHub client id                       |                                  |
| GITHUB_CLIENT_SECRET           | the GitHub client secret                   |                                  |
| WEBSITE                        | used as base to construct various URLs     | http://localhost:3000            |
| OWNER_USER_LOGIN_SUCCESS_URL   | URL to show owner user login success       | /owner-user-login-success.html   |
| USER_ADDED_TO_TEAM_SUCCESS_URL | URL to show success of adding user to team | /user-added-to-team-success.html |



Normally you just need config the GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET:

```shell
export GITHUB_CLIENT_ID=...
export GITHUB_CLIENT_SECRET=...
```

Or on windows:

```shell
set GITHUB_CLIENT_ID=...
set GITHUB_CLIENT_SECRET=...
```


## GitHub OAuth App Setup

- login into githum.com
- click the upper right avatar, then click `Settings`
- click the left pannel --> Developer settings --> OAuth Apps
- click the `Register a new application`, fill in the fields,
  note that the `Authorization callback URL` should be the deployed web site,
  for local deployment, it should be `http://localhost:3000`
- after creating the OAuth app, you can see its client id and client secret,
  these should be set to GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET environment variables



## Unit Test

Run:

```shell
npm test
```

After running tests, all data in database are cleared.


## Init Data

Run:

```shell
npm run init-data
```

It will clear all data, and create an admin with credential `admin` / `password`.


## Local Setup

```shell
npm start
```

Server should be started at port 3000.


## Postman

Import docs/Ragnar.postman_collection.json and docs/Ragnar.postman_environment.json to Postman.
You must first run the `npm run init-data` to initialize data, so that the admin login can run successfully.
After admin login, the admin token is automatically set to ADMIN-TOKEN environment variable,
and the `Save User` test can run, you may use the `Save User` test to create owner user of your GitHub username.


## Verification

- run `npm run init-data` to initialize data
- run `npm start` to start the app
- in Postman, call `Admin Login`, then call `Save User` with your GitHub username,
  this will create an owner user of your GitHub username
- login into github.com, create some test teams
- use browser to browse `http://localhost:3000/api/v1/github/owneruser/login`, GitHub OAuth will start,
  then you should grant permissions to the app to manage your organizations/teams,
  if successful, you will finallly see a success page
- after the owner user login, credential data are stored in session, you may use this browser session
  to do some owner user operations
- browse `http://localhost:3000/api/v1/github/owneruser/teams` to view current owner user's teams,
  pagination is supported, e.g. browse `http://localhost:3000/api/v1/github/owneruser/teams?page=1&perPage=10`
- during browsing teams, choose a team to allow user registration, extract its team id, which is used below
- browse `http://localhost:3000/api/v1/github/teams/{above-selected-team-id}/registrationurl`, it will response
  with content like below:
  {"url":"http://localhost:3000/api/v1/github/teams/registration/33a83455-0a22-4221-82c3-bcc66f362a37-1504274541624"}
  this is the URL for other users to register your selected team
- go to github.com, logout the current owner user, so that another user can login
- browse the above generated team registration URL, then another GitHub OAuth flow starts,
  here you may want to login with another user, which is to be added to the above selected team,
  then you will need to grant permission to the app to view your public profile,
  finally you will see another success page
- if the latter user was not in the team, an invitation email is sent, after accepting the invitation,
  the user is added to the team




## Notes

- the original Postman tests and unit tests are outdated, thus they are removed;
  the current unit tests and Postman tests are to test admin functionalities;
  the GitHub related functionalities involve GitHub OAuth, which requires user intervention,
  so they are verified manually using browsers, see above Verification section for details.
- good luck that Github access token won't expire, so the generated team registration URL will always work
- note that GitHub remembers your login and permission grant, if you granted the app once, it will automatically
  grant permission in the next OAuth flow

