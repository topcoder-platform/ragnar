/*
 * Copyright (c) 2017 TopCoder, Inc. All rights reserved.
 */

/**
 * Tests for GitHubController.
 *
 * @author TCSCODER
 * @version 1.0
 */
 /* eslint-disable no-magic-numbers */
const GitHub = require('github-api');
const chai = require('chai');
const supertest = require('supertest');
const api = supertest(require('../app'));
const constants = require('../common/constants');
const config = require('../config');
const testConfig = require('./config');

chai.should();
const github = new GitHub(config.GITHUB_ACCOUNT);

describe('GET /api/v1/github/user/teams', () => {
  it('Page number is negative, 400 error expected', async() => {
    await api.get('/api/v1/github/user/teams?page=-1')
      .expect(400);
  });

  it('Page number is zero, 400 error expected', async() => {
    await api.get('/api/v1/github/user/teams?page=0')
      .expect(400);
  });

  it('Page size is negative, 400 error expected', async() => {
    await api.get('/api/v1/github/user/teams?perPage=-1')
      .expect(400);
  });

  it('Page size is zero, 400 error expected', async() => {
    await api.get('/api/v1/github/user/teams?perPage=0')
      .expect(400);
  });

  it('Default pagination options should be applied', async() => {
    const response = await api.get('/api/v1/github/user/teams')
      .expect(200);
    response.body.should.have.property('page', 1);
    response.body.should.have.property('perPage', constants.DEFAULT_PER_PAGE);
    response.body.should.have.property('lastPage');
    response.body.should.have.property('teams');
  });

  it('Pagination options should have effect', async() => {
    let response = await api.get('/api/v1/github/user/teams?page=1&perPage=1')
      .expect(200);
    response.body.should.have.property('page', 1);
    response.body.should.have.property('perPage', 1);
    response.body.should.have.property('lastPage');
    response.body.should.have.property('teams').with.lengthOf(1); // Should have one team

    const totalCount = response.body.lastPage;

    const outOfBoundPage = totalCount + 1;
    response = await api.get(`/api/v1/github/user/teams?page=${outOfBoundPage}&perPage=1`)
      .expect(200);
    response.body.should.have.property('page', outOfBoundPage);
    response.body.should.have.property('perPage', 1);
    response.body.should.have.property('lastPage', totalCount);
    response.body.should.have.property('teams').with.lengthOf(0); // The page number is out of bound, should return zero teams
  });
});

describe('PUT /api/v1/github/teams/:id/memberships/:username', () => {
  it('Team id is not found, 404 error expected', async() => {
    await api.put('/api/v1/github/teams/:id/memberships/:username')
      .expect(404);
  });

  it('User should be added to team', async() => {
    const teams = (await github.getOrganization(testConfig.TEST_ORG).getTeams()).data;
    console.log(`Add user to team ${teams[0].name}`); // eslint-disable-line
    const response = await api.put(`/api/v1/github/teams/${teams[0].id}/memberships/${config.GITHUB_ACCOUNT.username}`)
      .expect(200);
    response.body.should.have.property('state', 'active');
    response.body.should.have.property('role', 'maintainer');
  });
});
