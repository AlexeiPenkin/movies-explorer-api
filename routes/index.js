const routes = require('express').Router();
const { createUser, login } = require('../controllers/user');
const auth = require('../middlewares/auth');
const { createUserValidation, loginValidation } = require('../middlewares/validation');
const userRoutes = require('./user');
const movieRoutes = require('./movie');

routes.post('/signup', createUserValidation, createUser);

routes.post('/signin', loginValidation, login);

routes.use(auth);

routes.use('/users', userRoutes);

routes.use('/movies', movieRoutes);

module.exports = { routes };
