const auth = require('../middlewares/auth');
const routerLogin = require('./login');
const routerRegister = require('./register');
const routerUser = require('./users');
const routerMovie = require('./movies');

module.exports = (app) => {
  app.use('/', routerLogin);
  app.use('/', routerRegister);
  app.use('/', auth, routerUser);
  app.use('/', auth, routerMovie);
};
