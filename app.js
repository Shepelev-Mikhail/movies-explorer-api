const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const defaultErrorHandler = require('./middlewares/defaultErrorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');
const NotFoundError = require('./errors/NotFoundError');
const { DEV_NAME_DB } = require('./utils/config');
const { pageNotFound } = require('./utils/constants');

const options = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://shepelev.movies.nomoredomains.xyz',
    'https://api.shepelev.movies.nomoredomains.xyz',
    'http://shepelev.movies.nomoredomains.xyz',
    'http://api.shepelev.movies.nomoredomains.xyz',
    'https://Shepelev-Mikhail.github.io',
  ],
  credentials: true, // эта опция позволяет устанавливать куки
};

const { PORT = 3000, NODE_ENV, NAME_DB } = process.env;

const app = express();

app.use('*', cors(options));

app.use(helmet());

// прием данных
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

router(app);

app.use((req, res, next) => {
  next(new NotFoundError(pageNotFound));
});

app.use(errorLogger);

mongoose.connect(NODE_ENV === 'production' ? NAME_DB : DEV_NAME_DB, {
  useNewUrlParser: true,
});

app.use(errors());
app.use(defaultErrorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
