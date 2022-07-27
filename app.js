const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const defaultErrorHandler = require('./middlewares/defaultErrorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const routerLogin = require('./routes/login');
const routerRegister = require('./routes/register');
const routerUser = require('./routes/users');
const routerMovie = require('./routes/movies');
const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000 } = process.env;
// const { NAME_DB } = process.env;

const app = express();

// прием данных
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use('/', routerLogin);
app.use('/', routerRegister);
app.use('/', auth, routerUser);
app.use('/', auth, routerMovie);

app.use((req, res, next) => {
  next(new NotFoundError('Page not found'));
});

app.use(errorLogger);

mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
});

// NODE_ENV === 'production' ? NAME_DB : 'mongodb://localhost:27017/devmoviesdb'

app.use(errors());
app.use(defaultErrorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
