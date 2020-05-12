const express = require('express');
const router = express.Router();

const TaskController = require('../controllers/tasks');

router.post('/tasks', TaskController.createTask);

router.get('/tasks', TaskController.getTasks);

router.get('/tasks/:id', TaskController.getTask);

router.patch('/tasks/:id', TaskController.updateTask);

router.delete('/tasks/:id', TaskController.deleteTask);

module.exports = router;
