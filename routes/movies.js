const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const { createMovie, findSaveMovie, deleteMovie } = require('../controllers/movies');

const regex = /(http|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])/;

router.get('/movies', findSaveMovie);

router.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    descritpion: Joi.string().required(),
    image: Joi.string().required().regex(regex),
    trailerLink: Joi.string().required().regex(regex),
    thumbnail: Joi.string().required().regex(regex),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.string().hex().required(),
  }),
  // params: Joi.object().keys({
  //   movieId: Joi.string().hex().required(),
  // }),
}), createMovie);

router.delete('/movies/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().required(),
  }),
}), deleteMovie);

module.exports = router;
