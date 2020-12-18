const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const app = require('../src/app');
const User = require('../src/models/user');
const ENV = require('../src/config/config');
const { findById } = require('../src/models/user');

const userOneId = new mongoose.Types.ObjectId();

// for testing on an existing user
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

beforeEach(async () => {
	await User.deleteMany();
	await new User(userOne).save();
});

test('Should signup a new user', async () => {
	const response = await request(app)
		.post('/users')
		.send({
			name: 'Unit test',
			email: 'test@test.com',
			password: 'MyPass777!',
		})
		.expect(201);

	// check if database changed correctly
	const user = await User.findById(response.body.user._id);
	expect(user).not.toBeNull();

	// doesnt have to match completely
	expect(response.body).toMatchObject({
		user: {
			name: 'Unit test',
			email: 'test@test.com',
		},
	});

	// making sure that the password is encrypted
	expect(user.password).not.toBe('MyPass777!');
});

test('Should login a user', async () => {
	const response = await request(app)
		.post('/users/login')
		.send({
			email: userOne.email,
			password: userOne.password,
		})
		.expect(200);

	const user = await User.findById(userOneId);
	expect(response.body.token).toBe(user.tokens[1].token);
});

test('Should not login nonexistent user', async () => {
	await request(app)
		.post('/users/login')
		.send({
			email: userOne.email,
			password: 'wrongPassword',
		})
		.expect(400);
});

test('Should get profile for user', async () => {
	await request(app)
		.get('/users/me')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send()
		.expect(200);
});

test('Should not get profile for unauthenticated user', async () => {
	await request(app).get('/users/me').send().expect(401);
});

test('Should delete account for user', async () => {
	await request(app)
		.delete('/users/me')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send()
		.expect(200);

	const user = await User.findById(userOneId);
	expect(user).toBeNull();
});

test('Should not delete account for unauthenticated user', async () => {
	await request(app).delete('/users/me').send().expect(401);
});
