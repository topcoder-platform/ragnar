/**
 * Initialize data in database. It will clear all data, and create an admin with credential admin/password.
 */
const Admin = require('./models').Admin;
const User = require('./models').User;
const OwnerUserTeam = require('./models').OwnerUserTeam;
const logger = require('./common/logger');
const helper = require('./common/helper');

(async() => {
  // hash a password
  const password = await helper.hashString('password');
  await Admin.remove();
  await Admin.create({
    username: 'admin',
    password,
  });

  await User.remove();
  await OwnerUserTeam.remove();
})().then(() => {
  logger.info('done');
  process.exit(); // eslint-disable-line no-process-exit
}).catch((e) => {
  logger.error(e);
  logger.error(e.stack);
  process.exit(); // eslint-disable-line no-process-exit
});
