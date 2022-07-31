const userRouter = require('express').Router();

const {
  getUserById, updateProfile, createUser,
} = require('../controllers/user');

const {
  updateProfileValidation, createUserValidation,
} = require('../middlewares/validation');

userRouter.post('/users', createUserValidation, createUser);

userRouter.get('/users/me', getUserById);

userRouter.patch('/users/me', updateProfileValidation, updateProfile);

module.exports = userRouter;
