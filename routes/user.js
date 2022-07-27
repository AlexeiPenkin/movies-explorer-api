const userRoutes = require('express').Router();

const {
  getUserById, updateProfile,
} = require('../controllers/user');

const {
  updateProfileValidation,
} = require('../middlewares/validation');

userRoutes.get('/users/me', getUserById);

userRoutes.patch('/users/me', updateProfileValidation, updateProfile);

module.exports = userRoutes;
