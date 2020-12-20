const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = require('../../src/models/user');
const Task = require('../../src/models/task');

const ENV = require('../../src/config/config');

// for testing on an existing user
const userOneId = new mongoose.Types.ObjectId();
const userOne = {
	_id: userOneId,
	name: 'Hassan',
	email: 'hassan@example.com',
	password: 'MyPass198!!',
	tokens: [
		{
			token: jwt.sign({ _id: userOneId }, ENV.JWT_KEY),
		},
	],
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
	_id: userTwoId,
	name: 'Omar',
	email: 'Omar@example.com',
	password: 'MyPass123!!',
	tokens: [
		{
			token: jwt.sign({ _id: userTwoId }, ENV.JWT_KEY),
		},
	],
};

const taskOne = {
	_id: new mongoose.Types.ObjectId(),
	description: 'unit test, 1st task',
	completed: false,
	creator: userOne._id,
};

const taskTwo = {
	_id: new mongoose.Types.ObjectId(),
	description: 'unit test, 2nd task',
	completed: true,
	creator: userOne._id,
};

const taskThree = {
	_id: new mongoose.Types.ObjectId(),
	description: 'unit test, 3rd task',
	completed: false,
	creator: userTwo._id,
};

const setupDatabase = async () => {
	await User.deleteMany();
	await new User(userOne).save();
	await new User(userTwo).save();

	await Task.deleteMany();
	await new Task(taskOne).save();
	await new Task(taskTwo).save();
	await new Task(taskThree).save();
};

module.exports = {
	userOneId,
	userOne,
	userTwoId,
	userTwo,
	taskOne,
	taskTwo,
	taskThree,
	setupDatabase,
};
