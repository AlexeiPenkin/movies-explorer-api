const { celebrate, Joi } = require('celebrate');
const { isURL, isEmail } = require('validator');
const ObjectId = require('mongoose').Types;

module.exports.getUserByIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex(),
  }),
});

module.exports.createUserValidation = celebrate({ /* /sigup */
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().custom((value, error) => {
      if (isEmail(value)) {
        return value;
      }
      return error.message('Некорректный формат адреса');
    }),
    password: Joi.string().required().min(6),
  }),
});

module.exports.updateProfileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().custom((value, error) => {
      if (isEmail(value)) {
        return value;
      }
      return error.message('Некорректный формат адреса');
    }),
  }),
});

module.exports.loginValidation = celebrate({ /* /sigin */
  body: Joi.object().keys({
    email: Joi.string().required().custom((value, error) => {
      if (isEmail(value)) {
        return value;
      }
      return error.message('Некорректный формат адреса');
    }),
    password: Joi.string().required().min(8),
  }),
});

module.exports.userMovieIdValidation = celebrate({
  params: Joi.object().keys({
    userMovieId: Joi.string().required().custom((value, error) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return error.message('Некорректный id');
    }),
  }),
});

module.exports.createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value, error) => {
      if (isURL(value)) {
        return value;
      }
      return error.message('Некорректный формат ссылки');
    }),
    trailerLink: Joi.string().required().custom((value, error) => {
      if (isURL(value)) {
        return value;
      }
      return error.message('Некорректный формат ссылки');
    }),
    thumbnail: Joi.string().required().custom((value, error) => {
      if (isURL(value)) {
        return value;
      }
      return error.message('Некорректный формат ссылки');
    }),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});
