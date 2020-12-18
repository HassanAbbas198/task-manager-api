const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
require('./db/mongoose');

const tasksRoutes = require('./routes/tasks');
const usersRoutes = require('./routes/users');

const app = express();

app.use(bodyParser.json());

app.use(tasksRoutes);
app.use(usersRoutes);

app.use((error, req, res, next) => {
	const status = error.statusCode || 500;
	const message = error.message;
	res.status(status).send({ error: message });
});

module.exports = app;
