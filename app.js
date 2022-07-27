const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const defaultErrorHandler = require('./middlewares/defaultErrorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');
const NotFoundError = require('./errors/NotFoundError');
const { DEV_NAME_DB } = require('./utils/config');
const { pageNotFound } = require('./utils/constants');

const { PORT = 3000, NODE_ENV, NAME_DB } = process.env;

const app = express();
app.set('trust proxy', 2);
app.get('/ip', (request, response) => response.send(request.ip));

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
