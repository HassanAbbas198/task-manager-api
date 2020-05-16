const express = require('express');
const router = express.Router();

const TaskController = require('../controllers/tasks');
const isAuth = require('../middleware/check-auth');

router.post('/tasks', isAuth, TaskController.createTask);

router.get('/tasks', isAuth, TaskController.getTasks);

router.get('/tasks/:id', isAuth, TaskController.getTask);

router.patch('/tasks/:id', isAuth, TaskController.updateTask);

router.delete('/tasks/:id', isAuth, TaskController.deleteTask);

module.exports = router;
