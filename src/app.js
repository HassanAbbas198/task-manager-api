const express = require('express');
const bodyParser = require('body-parser');
require('./db/mongoose');

const PORT = process.env.PORT || 3000;

const User = require('./models/user');
const Task = require('./models/task');

const app = express();

app.use(bodyParser.json());

app.post('/users', (req, res, next) => {
	const user = new User(req.body);
	user
		.save()
		.then((user) => {
			res.status(201).send(user);
		})
		.catch((error) => {
			res.status(400).send(error);
		});
});

app.get('/users', async (re, res, next) => {
	const users = await User.find();
	res.send(users);
});

app.get('/users/:id', async (req, res, next) => {
	const id = req.params.id;
	try {
		const user = await User.findById(id);
		if (!user) {
			return res.status(404).send();
		}
		res.send(user);
	} catch (error) {
		res.status(400).send(error);
	}
});

app.post('/tasks', (req, res, next) => {
	const task = new Task(req.body);
	task
		.save()
		.then(() => {
			res.status(201).send(task);
		})
		.catch((error) => {
			res.status(400).send(error);
		});
});

app.get('/tasks', async (req, res, next) => {
	const tasks = await Task.find();
	res.send(tasks);
});

app.get('/tasks/:id', async (req, res, next) => {
	const id = req.params.id;
	try {
		const task = await Task.findById(id);

		res.send(task);
	} catch (error) {
		if (!task) {
			return res.status(404).send(error);
		}
	}
});

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
