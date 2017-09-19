/*
 * Copyright (c) 2017 TopCoder, Inc. All rights reserved.
 */

/**
 * Tests for AdminController.
 *
 * @author TCSCODER
 * @version 1.0
 */
/* eslint-disable no-magic-numbers */
const chai = require('chai');
const supertest = require('supertest');
const api = supertest(require('../app'));
const constants = require('../common/constants');
const Admin = require('../models').Admin;
const User = require('../models').User;
const OwnerUserTeam = require('../models').OwnerUserTeam;
const OwnerUserGroup = require('../models').OwnerUserGroup;
const helper = require('../common/helper');

chai.should();

describe('Test Admin Functionalities', () => {
  let adminToken;

  beforeEach(async() => {
    // hash a password
    const password = await helper.hashString('password');
    await Admin.remove();
    await Admin.create({
      username: 'admin',
      password,
    });

    await User.remove();
    await OwnerUserTeam.remove();
    await OwnerUserGroup.remove();
  });

  after(async() => {
    await Admin.remove();
    await User.remove();
    await OwnerUserTeam.remove();
    await OwnerUserGroup.remove();
  });

  it('admin login, missing username, 400 error expected', async() => {
    await api.post('/api/v1/admin/login').send({password: 'pass'})
      .expect(400);
  });

  it('admin login, invalid password, 400 error expected', async() => {
    await api.post('/api/v1/admin/login').send({username: 'admin', password: 123})
      .expect(400);
  });

  it('admin login, user is not found, 404 error expected', async() => {
    await api.post('/api/v1/admin/login').send({username: 'none', password: 'pass'})
      .expect(404);
  });

  it('admin login, wrong password, 401 error expected', async() => {
    await api.post('/api/v1/admin/login').send({username: 'admin', password: 'wrong'})
      .expect(401);
  });

  it('admin login, successfully', async() => {
    const response = await api.post('/api/v1/admin/login').send({username: 'admin', password: 'password'})
      .expect(200);
    response.body.should.have.property('username', 'admin');
    response.body.should.have.property('token');
    adminToken = response.body.token;
  });

  it('save user, missing username, 400 error expected', async() => {
    await api.post('/api/v1/admin/users').set('Authorization', `Bearer ${adminToken}`)
      .send({role: constants.USER_ROLES.OWNER, type: constants.USER_TYPES.GITHUB})
      .expect(400);
  });

  it('save user, invalid role, 400 error expected', async() => {
    await api.post('/api/v1/admin/users').set('Authorization', `Bearer ${adminToken}`)
      .send({username: 'someuser', role: 'invalid', type: constants.USER_TYPES.GITHUB})
      .expect(400);
  });

  it('save user, invalid type, 400 error expected', async() => {
    await api.post('/api/v1/admin/users').set('Authorization', `Bearer ${adminToken}`)
      .send({username: 'someuser', role: constants.USER_ROLES.OWNER, type: 'invalid'})
      .expect(400);
  });

  it('save user, missing authorization token, 401 error expected', async() => {
    await api.post('/api/v1/admin/users')
      .send({username: 'someuser', role: constants.USER_ROLES.OWNER, type: constants.USER_TYPES.GITHUB})
      .expect(401);
  });

  it('save user, wrong token, 401 error expected', async() => {
    await api.post('/api/v1/admin/users').set('Authorization', 'Bearer wrong')
      .send({username: 'someuser', role: constants.USER_ROLES.OWNER, type: constants.USER_TYPES.GITHUB})
      .expect(401);
  });

  it('save github user successfully', async() => {
    // create user
    let response = await api.post('/api/v1/admin/users').set('Authorization', `Bearer ${adminToken}`)
      .send({username: 'someuser', role: constants.USER_ROLES.OWNER, type: constants.USER_TYPES.GITHUB})
      .expect(200);
    response.body.should.have.property('username', 'someuser');
    response.body.should.have.property('role', constants.USER_ROLES.OWNER);
    response.body.should.have.property('type', constants.USER_TYPES.GITHUB);
    response.body.should.have.property('id');
    const savedUserId = response.body.id;

    // save same user, user is updated, id is not changed
    response = await api.post('/api/v1/admin/users').set('Authorization', `Bearer ${adminToken}`)
      .send({username: 'someuser', role: constants.USER_ROLES.OWNER, type: constants.USER_TYPES.GITHUB})
      .expect(200);
    response.body.should.have.property('username', 'someuser');
    response.body.should.have.property('role', constants.USER_ROLES.OWNER);
    response.body.should.have.property('type', constants.USER_TYPES.GITHUB);
    response.body.should.have.property('id', savedUserId);
  });

  it('save gitlab user successfully', async() => {
    // create user
    let response = await api.post('/api/v1/admin/users').set('Authorization', `Bearer ${adminToken}`)
      .send({username: 'someuser', role: constants.USER_ROLES.OWNER, type: constants.USER_TYPES.GITLAB})
      .expect(200);
    response.body.should.have.property('username', 'someuser');
    response.body.should.have.property('role', constants.USER_ROLES.OWNER);
    response.body.should.have.property('type', constants.USER_TYPES.GITLAB);
    response.body.should.have.property('id');
    const savedUserId = response.body.id;

    // save same user, user is updated, id is not changed
    response = await api.post('/api/v1/admin/users').set('Authorization', `Bearer ${adminToken}`)
      .send({username: 'someuser', role: constants.USER_ROLES.OWNER, type: constants.USER_TYPES.GITLAB})
      .expect(200);
    response.body.should.have.property('username', 'someuser');
    response.body.should.have.property('role', constants.USER_ROLES.OWNER);
    response.body.should.have.property('type', constants.USER_TYPES.GITLAB);
    response.body.should.have.property('id', savedUserId);
  });
});
