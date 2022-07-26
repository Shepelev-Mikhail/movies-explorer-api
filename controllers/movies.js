const Movie = require('../models/movie');
const ValidError = require('../errors/ValidError');
const NotFoundError = require('../errors/NotFoundError');
const AccessError = require('../errors/AccessError');

// создание фильма
module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    descritpion,
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
    descritpion,
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
        next(new ValidError('Переданы некорректные данные для создания записи'));
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
    Movie.findByIdAndRemove(req.params.movieId)
      .then((movie) => res.status(200).send(movie))
      .catch(next);
  };

  Movie.findById(req.params.movieId)
    .orFail(new Error('NotFoundError'))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        next(new AccessError('Вы не являетесь владельцем записи'));
        return;
      }
      removeMovie();
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidError('Переданы некорректные данные записи'));
        return;
      }
      if (err.message === 'NotFoundError') {
        next(new NotFoundError('Запись с указанным id не найдена'));
        return;
      }
      next(err);
    });
};
