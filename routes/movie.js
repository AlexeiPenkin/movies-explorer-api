const movieRoutes = require('express').Router();

const {
  getMovies,
  deleteMovie,
  createMovie
} = require('../controllers/movie');

const {
  createMovieValidation,
  userMovieIdValidation,
} = require('../middlewares/validation');

movieRoutes.get('/', getMovies);

movieRoutes.post('/', createMovieValidation, createMovie);

movieRoutes.delete('/:userMovieId', userMovieIdValidation, deleteMovie);

module.exports = { movieRoutes };
