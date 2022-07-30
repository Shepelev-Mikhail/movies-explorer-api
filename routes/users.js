const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const { showUserInfo, updateProfile } = require('../controllers/users');

router.get('/users/me', showUserInfo);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
  }),
}), updateProfile);

module.exports = router;
