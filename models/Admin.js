/**
 * This defines admin model.
 */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
  username: {type: String, required: true, unique: true},
  // hashed password
  password: {type: String, required: true},
});

schema.index({username: 1});

module.exports = schema;
