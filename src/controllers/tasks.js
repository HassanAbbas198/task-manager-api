const Task = require('../models/task');

exports.createTask = async (req, res, next) => {
	const task = new Task({ ...req.body, creator: req.user._id });
	try {
		await task.save();
		res.status(201).send(task);
	} catch (error) {
		res.status(400).send(error);
	}
};

exports.getTasks = async (req, res, next) => {
	// const creator = req.user._id;
	const user = req.user;
	try {
		await user.populate('myTasks').execPopulate();
		// const tasks = await Task.find({ creator });
		res.send(user.myTasks);
	} catch (error) {
		res.status(400).send(error);
	}
};

exports.getTask = async (req, res, next) => {
	const id = req.params.id;
	const creator = req.user._id;

	try {
		const task = await Task.findOne({ _id: id, creator });

		if (!task) {
			res.status(404).send(`Couldn't find a task`);
		}

		res.send(task);
	} catch (error) {
		res.status(400).send();
	}
};

exports.updateTask = async (req, res, next) => {
	const id = req.params.id;
	const creator = req.user._id;

	const updates = Object.keys(req.body);
	const allowedUpdates = ['description', 'completed'];
	const isValidOperation = updates.every((update) =>
		allowedUpdates.includes(update)
	);

	if (!isValidOperation) {
		return res.status(400).send('Invalid updates');
	}

	try {
		const task = await Task.findOne({ _id: id, creator });

		if (!task) {
			res.status(404).send();
		}

		updates.forEach((update) => (task[update] = req.body[update]));
		await task.save();

		res.send(task);
	} catch (error) {
		res.status(400).send(error);
	}
};

exports.deleteTask = async (req, res, next) => {
	const id = req.params.id;
	const creator = req.user._id;

	try {
		const task = await Task.findOneAndDelete({ _id: id, creator });
		if (!task) {
			res.status(404).send(`Couldn't find task`);
		}
		res.send('Task deleted successfully');
	} catch (error) {
		res.status(400).send(error);
	}
};
