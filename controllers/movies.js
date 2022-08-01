const Movie = require('../models/movie');
const ValidError = require('../errors/ValidError');
const NotFoundError = require('../errors/NotFoundError');
const AccessError = require('../errors/AccessError');
const {
  incorrectDataToCreate,
  notOwner,
  incorrectData,
  recordNotFound,
} = require('../utils/constants');

// создание фильма
module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidError(incorrectDataToCreate));
        return;
      }
      next(err);
    });
};

// найти все сохраненные фильмы
module.exports.findSaveMovie = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

// удалить фильм
module.exports.deleteMovie = (req, res, next) => {
  const removeMovie = () => {
    Movie.findByIdAndRemove(req.params._id)
      .then((movie) => res.status(200).send(movie))
      .catch(next);
  };

  Movie.findById(req.params._id)
    .orFail(new NotFoundError(recordNotFound))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        next(new AccessError(notOwner));
        return;
      }
      removeMovie();
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidError(incorrectData));
        return;
      }
      next(err);
    });
};
