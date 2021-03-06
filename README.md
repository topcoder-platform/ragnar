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

- GET /github/owneruser/login - github owner user login, using GitHub OAuth
- GET /github/owneruser/callback - github owner user login OAuth callback
- GET /github/owneruser/teams - github owner user views his/her teams
- GET /github/teams/:id/registrationurl - github owner user creates a registration URL for his/her team
- GET /github/teams/registration/:identifier - normal user registers a team via this API, it will do GitHub OAuth
- GET /github/normaluser/callback - normal user GitHub OAuth callback

- GET /gitlab/owneruser/login - gitlab owner user login, using GitLab OAuth
- GET /gitlab/owneruser/callback - gitlab owner user login OAuth callback
- GET /gitlab/owneruser/groups - gitlab owner user views his/her groups
- GET /gitlab/groups/:id/registrationurl - gitlab owner user creates a registration URL for his/her group
- GET /gitlab/groups/registration/:identifier - normal user registers a group via this API, it will do GitLab OAuth
- GET /gitlab/normaluser/callback - normal user GitLab OAuth callback

- GET /tclogin - TopCoder login
- GET /admin/tcuser - get TopCoder/GitLab/GitHub user mapping


## Configuration

Map the localhost to ragnarlocal.topcoder.com by editing `hosts` file.

The following config parameters are supported, they are defined in `config.js` and can be configured in system environment:


| Name                                   | Description                                | Default                          |
| :------------------------------------- | :----------------------------------------: | :------------------------------: |
| PORT                                   | the port the application will listen on    |  80                              |
| API_VERSION                            | the API version                            |   v1                             |
| LOG_LEVEL                              | the log level                              |  info                            |
| MONGODB_URI                            | the MongoDB URI                            | mongodb://localhost:27017/ragnar |
| PASSWORD_HASH_SALT_LENGTH              | the password hash salt length              | 10                               |
| SESSION_SECRET                         | the session secret                         | kjsdfkj34857                     |
| JWT_SECRET                             | the JWT secret                             | hjijfvbw859                      |
| JWT_EXPIRATION                         | a string of time span                      | 2 days                           |
| GITHUB_CLIENT_ID                       | the GitHub client id                       |                                  |
| GITHUB_CLIENT_SECRET                   | the GitHub client secret                   |                                  |
| WEBSITE                                | used as base to construct various URLs     | http://ragnarlocal.topcoder.com/ |
| GITHUB_OWNER_CALLBACK_URL              | URL to handle github login callback        | /app/github-owner-login          |
| OWNER_USER_LOGIN_SUCCESS_URL           | URL to show owner user login success       | /app/github-owner                |
| USER_ADDED_TO_TEAM_SUCCESS_URL         | URL to show success of adding user to team | /app/github-members/added        |
| GITLAB_API_BASE_URL                    | The Gitlab API base URL                    | https://gitlab.com/api/v4        |
| GITLAB_CLIENT_ID                       | the GitLab client id                       |                                  |
| GITLAB_CLIENT_SECRET                   | the GitLab client secret                   |                                  |
| GITLAB_OWNER_CALLBACK_URL              | URL to handle gitlab login callback        | /app/gitlab-owner-login          |
| GITLAB_OWNER_USER_LOGIN_SUCCESS_URL    | URL to show owner user login success       | /app/gitlab-owner                |
| GITLAB_USER_ADDED_TO_GROUP_SUCCESS_URL | URL to show success of adding user to group| /app/gitlab-members/added        |
| TC_LOGIN_URL                           | URL to do TopCoder login |                      |
| TC_LOGIN_CALLBACK_URL | URL to handle Topcoder login callback||
| TC_USER_PROFILE_URL                    | URL to to call TopCoder API to get profile from token    | https://accounts.topcoder.com/member?retUrl=http:%2F%2Fragnarlocal.topcoder.com%2Fapi%2Fv1%2Ftclogin |


Normally you just need config the GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITLAB_CLIENT_ID and GITLAB_CLIENT_SECRET:

```shell
export GITHUB_CLIENT_ID=...
export GITHUB_CLIENT_SECRET=...
export GITLAB_CLIENT_ID=...
export GITLAB_CLIENT_SECRET=...
```

Or on windows:

```shell
set GITHUB_CLIENT_ID=...
set GITHUB_CLIENT_SECRET=...
set GITLAB_CLIENT_ID=...
set GITLAB_CLIENT_SECRET=...
```


## GitHub OAuth App Setup

- login into github.com
- click the upper right avatar, then click `Settings`
- click the left pannel --> Developer settings --> OAuth Apps
- click the `Register a new application`, fill in the fields,
  note that the `Authorization callback URL` should be the deployed web site,
  for local deployment, it should be `http://localhost:80`
- after creating the OAuth app, you can see its client id and client secret,
  these should be set to GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET environment variables


## GitLab OAuth App Setup

- login into gitlab.com
- click the upper right avatar, then click `Settings`
- click the `Applications` tab
- enter application name, e.g. `Ragnar-tool`
- for Redirect URI, enter two callback URLs, one callback URL per line, so there are two lines:
  http://localhost:80/app/gitlab-owner-login
  http://localhost:80/api/v1/gitlab/normaluser/callback
- for Scopes, check the `api` and `read_user`, the `api` is for owner user, the `read_user` is for normal user
- finnally click `Save application` to save the OAuth app, then you will see its generated Application Id and Secret,
  these should be set to GITLAB_CLIENT_ID and GITLAB_CLIENT_SECRET environment variables



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

Server should be started at port 80.


## Postman

Import docs/Ragnar.postman_collection.json and docs/Ragnar.postman_environment.json to Postman.
You must first run the `npm run init-data` to initialize data, so that the admin login can run successfully.
After admin login, the admin token is automatically set to ADMIN-TOKEN environment variable,
then you may run the `Save GitHub User` and `Save GitLab User` tests to create owner user of your GitHub/GitLab usernames,
note that you must modify the request body username to use your GitHub/GitLab user names.
For the `Get User Mapping` test, you may quety mapping by providing either topcoderUsername, githubUsername or gitlabUsername.


## GitHub Verification

- run `npm run init-data` to initialize data
- run `npm start` to start the app
- in Postman, call `Admin Login`, then call `Save GitHub User` with your GitHub username,
  this will create an owner user of your GitHub username
- login into github.com, create some test teams
- use browser to browse `http://localhost:80/api/v1/github/owneruser/login`, GitHub OAuth will start,
  then you should grant permissions to the app to manage your organizations/teams,
  if successful, you will finallly see a success page
- after the owner user login, credential data are stored in session, you may use this browser session
  to do some owner user operations
- browse `http://localhost:80/api/v1/github/owneruser/teams` to view current owner user's teams,
  pagination is supported, e.g. browse `http://localhost:80/api/v1/github/owneruser/teams?page=1&perPage=10`
- during browsing teams, choose a team to allow user registration, extract its team id, which is used below
- browse `http://localhost:80/api/v1/github/teams/{above-selected-team-id}/registrationurl`,
  replacing {above-selected-team-id} with your selected team id, it will response with content like below:
  {"url":"http://localhost:80/api/v1/github/teams/registration/33a83455-0a22-4221-82c3-bcc66f362a37-1504274541624"}
  this is the URL for other users to register your selected team
- go to github.com, logout the current owner user, so that another user can login
- browse the above generated team registration URL, then another GitHub OAuth flow starts,
  here you may want to login with another user, which is to be added to the above selected team,
  then you will need to grant permission to the app to view your public profile,
  finally you will see another success page
- if the latter user was not in the team, an invitation email is sent, after accepting the invitation,
  the user is added to the team



## GitLab Verification

- run `npm run init-data` to initialize data
- run `npm start` to start the app
- in Postman, call `Admin Login`, then call `Save GitLab User` with your GitLab username,
  this will create an owner user of your GitLab username
- login into gitlab.com, create some test groups:
  click the upper right `+`, then click `New group`, fill in required fields to create group
- use browser to browse `http://localhost:80/api/v1/gitlab/owneruser/login`, GitLab OAuth will start,
  then you should grant permissions to the app to call your GitLab API,
  if successful, success page is shown
- after the owner user login, credential data are stored in session, you may use this browser session
  to do some owner user operations
- browse `http://localhost:80/api/v1/gitlab/owneruser/groups` to view current owner user's groups,
  pagination is supported, e.g. browse `http://localhost:80/api/v1/gitlab/owneruser/groups?page=1&perPage=10`
- during browsing groups, choose a group to allow user registration, extract its group id, which is used below
- browse `http://localhost:80/api/v1/gitlab/groups/{above-selected-group-id}/registrationurl`,
  replacing {above-selected-group-id} with your selected group id, it will response with content like below:
  {"url":"http://localhost:80/api/v1/gitlab/groups/registration/13cf572b-bea3-4407-934c-2b8885d2dd56-1504956395852"}
  this is the URL for other users to register your selected group
- go to gitlab.com, logout the current owner user, so that another user can login
- browse the above generated group registration URL, then another GitLab OAuth flow starts,
  here you may want to login with another user, which is to be added to the above selected group,
  this user should *NOT* be in the group so that s/he can be successfully added to the group,
  (you may login with this user and leave the group if s/he is already in the group),
  then you will need to grant permission to the app to read your user info,
  finally you will see another success page



## Backend Notes

- Github access token won't expire, so the generated team registration URL will always work
- Unlike Github, Gitlab OAuth token may expire in several hours, depending on gitlab API versions,
  and token should be refreshed when needed, see https://docs.gitlab.com/ce/api/oauth2.html
  `Web Application Flow` section for details.
  For this reason, the token data for the GitLab owner user are stored in User model (accessToken, accessTokenExpiration,
  refreshToken fields), instead of stored in OwnerUserGroup;
  when adding normal user to group, the access token is got from User model, and refresh it if needed.



# Frontend application

The frontend application was generated using `@angular/cli`.
All frontend source code is located in the `front` folder.
The app is mounted on `/app` so we can instruct express to always point to `index.html` (application root).

## App paths
- `/app/login` > Login for the admin
- `/app/users` > Allows admin to add a github user (add owners)
- `/app/github-owner` > Shows the teams an owner is part of, if user isn't logged in to github he is redirected to oAuth flow
- `/app/github-members/added` > Page shown after a user was successfully added to a team by using the team url
- `/app/github-owner-login` > Github login callback for owners
- `/app/gitlab-owner` > Shows the groups an owner is part of, if user isn't logged in to gitlab he is redirected to oAuth flow
- `/app/gitlab-members/added` > Page shown after a user was successfully added to a group by using the group url
- `/app/gitlab-owner-login` > Gitlab login callback for owners

## FE Configs
The frontend config file mainly contains the api urls. It is located in `front/environments/environment.ts`. If building for prod,
the `front/environments/environment.prod.ts` file will be used.

## Runing & building
When running `npm start` the frontend will automatically be built and a watcher for changes will be added (meanning the code will be rebuilt
upon file changes).

To access the application, after runnint `npm start` go to `http://ragnarlocal.topcoder.com/` in your browser.

To build the frontend for production, use the command:

```shell
npm run build:fe:prod
```
The built code is available in the public folder

## Login as admin
For admin login use the credentials generated by the `npm run init-data` command described above.

## Verification
- `npm run init-data`
- `npm start`
- browse `http://localhost:80/app`, login with credential `admin` / `password`
- add your github usernmae as owner, and add your gitlab username as owner
- browse `http://localhost:80/app`, login using github
- after the github OAuth login flow, you will see your teams
- click a team, then registration URL is generated and shown, the URL can be sent to other github users
  to register to the team, when accessing the URL by other github users,
  you need to login to Topcoder, and do another OAuth flow,
  and finally a success page is shown.
  Note that if you are testing using same browser, you need to logout the owner so that other users can login
  to register to the team.
- browse `http://localhost:80/app`, login using gitlab
- after the gitlab OAuth login flow, you will see your groups
- click a group, then registration URL is generated and shown, the URL can be sent to other gitlab users
  to register to the group, when accessing the URL by other gitlab users,
  you need to login to Topcoder, and do another OAuth flow,
  and finally a success page is shown.
  Note that if you are testing using same browser, you need to logout the owner so that other users can login
  to register to the group, and that user should NOT be in the group.



## TopCoder Login

- when normal user accesses registration URL, they need to do TopCoder login, so that we know which TopCoder member
  requests the GitHub/GibLab access, the TopCoder user name and associated GitHub/GitLab user name are stored in
  database, there is a new API `/admin/tcuser` to get TopCoder/GitLab/GitHub user name mapping
