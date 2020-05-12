const express = require('express');

const router = express.Router();

const UserController = require('../controllers/users');

router.post('/users', UserController.createUser);

router.get('/users', UserController.getUsers);

router.get('/users/:id', UserController.getUser);

router.patch('/users/:id', UserController.updateUser);

router.delete('/users/:id', UserController.deleteUser);

module.exports = router;
