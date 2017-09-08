/**
 * This defines user model.
 */
const _ = require('lodash');
const mongoose = require('mongoose');
const constants = require('../common/constants');

const Schema = mongoose.Schema;

const schema = new Schema({
  username: {type: String, required: true},
  role: {type: String, required: true, enum: _.values(constants.USER_ROLES)},
  type: {type: String, required: true, enum: _.values(constants.USER_TYPES)},
});

schema.index({username: 1});
schema.index({type: 1});

module.exports = schema;
