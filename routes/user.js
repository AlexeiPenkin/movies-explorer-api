const userRouter = require('express').Router();

const {
  getUserById, updateProfile,
} = require('../controllers/user');

const {
  updateProfileValidation,
} = require('../middlewares/validation');

userRouter.get('/users/me', getUserById);

userRouter.patch('/users/me', updateProfileValidation, updateProfile);

module.exports = userRouter;
