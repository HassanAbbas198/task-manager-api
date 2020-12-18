const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = require('../../src/models/user');
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

const setupDatabase = async () => {
	await User.deleteMany();
	await new User(userOne).save();
};

module.exports = {
	userOneId,
	userOne,
	setupDatabase,
};
