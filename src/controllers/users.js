const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.createUser = async (req, res, next) => {
	const user = new User(req.body);
	try {
		await user.save();

		const token = await user.generateAuthToken();
		res.status(201).send({ user, token });
	} catch (error) {
		res.status(400).send(error);
	}
};

exports.login = async (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;

	try {
		const user = await User.findOne({ email: email });
		if (!user) {
			throw new Error('Invalid email or password');
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			throw new Error('Invalid email or password');
		}

		const token = await user.generateAuthToken();

		// shorthand syntax instead of user:user, token:token
		res.send({ user, token });
	} catch (error) {
		res.status(400).send();
	}
};

exports.getUsers = async (req, res, next) => {
	try {
		const users = await User.find();
		res.send(users);
	} catch (error) {
		res.status(400).send(error);
	}
};

exports.getUser = async (req, res, next) => {
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
};

exports.updateUser = async (req, res, next) => {
	const id = req.params.id;

	const updates = Object.keys(req.body);
	const allowedUpdates = ['name', 'email', 'password', 'age'];
	const isValidOperation = updates.every((update) =>
		allowedUpdates.includes(update)
	);

	if (!isValidOperation) {
		return res.status(400).send('Invalid updates');
	}

	try {
		const user = await User.findById(id);

		updates.forEach((update) => (user[update] = req.body[update]));
		await user.save();

		if (!user) {
			return res.status(404).send();
		}
		res.send(user);
	} catch (error) {
		res.status(400).send(error);
	}
};

exports.deleteUser = async (req, res, next) => {
	const id = req.params.id;

	try {
		const user = await User.findByIdAndDelete(id);
		if (!user) {
			return res.status(404).send();
		}
		res.send('User deleted successfully');
	} catch (error) {
		res.status(400).send(error);
	}
};
