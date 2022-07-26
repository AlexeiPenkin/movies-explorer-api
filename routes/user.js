const userRoutes = require('express').Router();

const {
  getUserById, updateProfile,
} = require('../controllers/user');

const {
  updateProfileValidation
} = require('../middlewares/validation');

userRoutes.get('/me', getUserById);

userRoutes.patch('/me', updateProfileValidation, updateProfile);

module.exports = { userRoutes };
