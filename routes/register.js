const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const { createUser } = require('../controllers/users');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2),
  }),
}), createUser);

module.exports = router;
