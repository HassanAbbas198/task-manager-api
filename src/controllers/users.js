const User = require('../models/user');

exports.createUser = async (req, res, next) => {
	const user = new User(req.body);

	try {
		await user.save();
		res.status(201).send(user);
	} catch (error) {
		res.status(400).send(error);
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
		const user = await User.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});
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
