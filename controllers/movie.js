const movie = require('../models/movie');
const BAD_REQUEST_ERROR = require('../errors/bad-req-error');
const FORBIDDEN_ERROR = require('../errors/forbidden-error');
const NOT_FOUND_ERROR = require('../errors/notfound-error');

module.exports.getMovies = (req, res, next) => {
  movies.find({})
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

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
    nameEN
  } = req.body;
  const ownerMovieId = req.user._id;
  movie.create({
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
    owner: ownerMovieId
  })
    .then((movie) => res.status(200)
      .send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        throw new BAD_REQUEST_ERROR('Переданы некорректные данные');
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  movie.findById(req.params.userMovieId)
    .orFail(() => {
      throw new NOT_FOUND_ERROR('Карточка с фильмом по указанному id не найдена');
    })
    .then((movie) => {
      if (String(movie.owner) !== String(req.user._id)) {
        throw new FORBIDDEN_ERROR('Запрещено удалять чужую карточку');
      }
    })
    .then(() => {
      movie.findByIdAndRemove(req.params.movieId)
        .then((movie) => {
          if (!movie) {
            throw new BAD_REQUEST_ERROR('Переданы некорректные данные');
          } return res.send({ movie });
        });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        throw new NOT_FOUND_ERROR('Карточка с фильмом по указанному id не найдена');
      } else {
        next(err);
      }
    });
};
