const request = require('supertest');

const app = require('../src/app');
const User = require('../src/models/user');
const { userOneId, userOne, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

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

test('Should upload avatar image', async () => {
	await request(app)
		.post('/users/me/image')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.attach('image', 'tests/fixtures/profile-pic.jpg')
		.expect(200);

	// we cant use toBe to compare objects
	const user = await User.findById(userOneId);
	expect(user.image).toEqual(expect.any(Buffer));
});

test('Should update valid user fields', async () => {
	await request(app)
		.patch('/users/me')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send({
			name: 'Jessy',
		})
		.expect(200);

	const user = await User.findById(userOneId);
	expect(user.name).toEqual('Jessy');
});

test('Should not update invalid user fields', async () => {
	await request(app)
		.patch('/users/me')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send({
			location: 'Beirut',
		})
		.expect(400);
});
