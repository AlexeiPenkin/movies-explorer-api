const movieRouter = require('express').Router();

const {
  getMovies,
  deleteMovie,
  createMovie,
} = require('../controllers/movie');

const {
  createMovieValidation,
  userMovieIdValidation,
} = require('../middlewares/validation');

movieRouter.get('/', getMovies);

movieRouter.post('/', createMovieValidation, createMovie);

movieRouter.delete('/:userMovieId', userMovieIdValidation, deleteMovie);

module.exports = movieRouter;
