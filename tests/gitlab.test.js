/*
 * Copyright (c) 2017 TopCoder, Inc. All rights reserved.
 */

/**
 * Tests for GitLabController.
 *
 * @author TCSCODER
 * @version 1.0
 */
 /* eslint-disable no-magic-numbers */
const chai = require('chai');
const supertest = require('supertest');
const api = supertest(require('../app'));
const constants = require('../common/constants');
const testConfig = require('./config');

chai.should();
const expect = chai.expect;

// test group id to be found out in test
let testGroupId;

describe('GET /api/v1/gitlab/user/groups', () => {
  it('Page number is negative, 400 error expected', async() => {
    await api.get('/api/v1/gitlab/user/groups?page=-1')
      .expect(400);
  });

  it('Page number is zero, 400 error expected', async() => {
    await api.get('/api/v1/gitlab/user/groups?page=0')
      .expect(400);
  });

  it('Page size is negative, 400 error expected', async() => {
    await api.get('/api/v1/gitlab/user/groups?perPage=-1')
      .expect(400);
  });

  it('Page size is zero, 400 error expected', async() => {
    await api.get('/api/v1/gitlab/user/groups?perPage=0')
      .expect(400);
  });

  it('Default pagination options should be applied', async() => {
    const response = await api.get('/api/v1/gitlab/user/groups')
      .expect(200);
    response.body.should.have.property('page', 1);
    response.body.should.have.property('perPage', constants.GITLAB_DEFAULT_PER_PAGE);
    response.body.should.have.property('lastPage');
    response.body.should.have.property('groups');
  });

  it('Pagination options should have effect', async() => {
    let response = await api.get('/api/v1/gitlab/user/groups?page=1&perPage=1')
      .expect(200);
    response.body.should.have.property('page', 1);
    response.body.should.have.property('perPage', 1);
    response.body.should.have.property('lastPage');
    response.body.should.have.property('groups').with.lengthOf(1); // Should have one group

    const totalCount = response.body.lastPage;

    const outOfBoundPage = totalCount + 1;
    response = await api.get(`/api/v1/gitlab/user/groups?page=${outOfBoundPage}&perPage=1`)
      .expect(200);
    response.body.should.have.property('page', outOfBoundPage);
    response.body.should.have.property('perPage', 1);
    response.body.should.have.property('lastPage', totalCount);
    response.body.should.have.property('groups').with.lengthOf(0); // The page number is out of bound, should return zero groups
  });

  it('Get first page with max page size, then find out test group id', async() => {
    const response = await api.get(`/api/v1/gitlab/user/groups?page=1&perPage=${constants.GITLAB_MAX_PER_PAGE}`)
      .expect(200);
    response.body.should.have.property('page', 1);
    response.body.should.have.property('perPage', constants.GITLAB_MAX_PER_PAGE);
    response.body.should.have.property('lastPage');
    response.body.should.have.property('groups');

    const group = response.body.groups.find((gp) => gp.name === testConfig.GITLAB_TEST_GROUP_NAME);
    expect(group).to.exist; // eslint-disable-line no-unused-expressions
    testGroupId = group.id;
  });
});

describe('POST /api/v1/gitlab/groups/:id/memberships/:username', () => {
  it('Group id is not found, 404 error expected', async() => {
    await api.post(`/api/v1/gitlab/groups/123123123123123123/memberships/${testConfig.GITLAB_TEST_USERNAME}`)
      .expect(404);
  });

  it('Username is not found, 404 error expected', async() => {
    expect(testGroupId).to.exist; // eslint-disable-line no-unused-expressions
    await api.post(`/api/v1/gitlab/groups/${testGroupId}/memberships/NotFoundUsername234234234234234`)
      .expect(404);
  });

  it('User should be added to group', async() => {
    expect(testGroupId).to.exist; // eslint-disable-line no-unused-expressions
    const response = await api.post(`/api/v1/gitlab/groups/${testGroupId}/memberships/${testConfig.GITLAB_TEST_USERNAME}`)
      .expect(200);
    response.body.should.have.property('id');
    response.body.should.have.property('name');
    response.body.should.have.property('username', testConfig.GITLAB_TEST_USERNAME);
    response.body.should.have.property('state', 'active');
    response.body.should.have.property('access_level', constants.GITLAB_DEFAULT_GROUP_ACCESS_LEVEL);
  });

  it('User is already in the group, 409 error expected', async() => {
    expect(testGroupId).to.exist; // eslint-disable-line no-unused-expressions
    await api.post(`/api/v1/gitlab/groups/${testGroupId}/memberships/${testConfig.GITLAB_TEST_USERNAME}`)
      .expect(409);
  });
});
