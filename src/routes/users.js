const express = require('express');

const router = express.Router();

const UserController = require('../controllers/users');
const isAuth = require('../middleware/check-auth');

router.post('/users', UserController.createUser);

router.post('/users/login', UserController.login);

router.get('/users/me', isAuth, UserController.getProfile);

router.patch('/users/me', isAuth, UserController.updateUser);

router.delete('/users/me', isAuth, UserController.deleteUser);

router.post('/users/logout', isAuth, UserController.logout);

router.post('/users/logoutAll', isAuth, UserController.logoutAll);

module.exports = router;
