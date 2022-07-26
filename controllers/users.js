const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ValidError = require('../errors/ValidError');
const ConflictEmailError = require('../errors/ConflictEmailError');

require('dotenv').config();

const SECRET_KEY = 'dev_secret_key';
const { NODE_ENV, JWT_SECRET } = process.env;

// создание пользователя
module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!email || !password) {
    next(new ValidError('Не указан Email или пароль'));
    return;
  }

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.status(201).send({
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictEmailError('Email занят'));
        return;
      }
      if (err.name === 'ValidationError') {
        next(new ValidError('Переданы некорректные данные пользователя'));
        return;
      }
      next(err);
    });
};

// вход
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new ValidError('Не указан Email или пароль'));
    return;
  }

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : SECRET_KEY,
        { expiresIn: '7d' },
      );
      res.status(200).send({ token });
    })
    .catch(next);
};

// показать информацию о пользователе
module.exports.showUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(200).send(user))
    .catch(next);
};

// обновление профиля
module.exports.updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidError('Переданы некорректные данные пользователя'));
        return;
      }
      next(err);
    });
};
