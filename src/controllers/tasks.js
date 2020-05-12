const Task = require('../models/task');

exports.createTask = async (req, res, next) => {
	const task = new Task(req.body);
	try {
		await task.save();
		res.status(201).send(task);
	} catch (error) {
		res.status(400).send(error);
	}
};

exports.getTasks = async (req, res, next) => {
	try {
		const tasks = await Task.find();
		res.send(tasks);
	} catch (error) {
		res.status(400).send(error);
	}
};

exports.getTask = async (req, res, next) => {
	const id = req.params.id;
	try {
		const task = await Task.findById(id);
		if (!task) {
			return res.status(404).send(error);
		}
		res.send(task);
	} catch (error) {}
};

exports.updateTask = async (req, res, next) => {
	const id = req.params.id;

	const updates = Object.keys(req.body);
	const allowedUpdates = ['description', 'completed'];
	const isValidOperation = updates.every((update) =>
		allowedUpdates.includes(update)
	);

	if (!isValidOperation) {
		return res.status(400).send('Invalid updates');
	}

	try {
		const task = await Task.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!task) {
			return res.status(404).send();
		}
		res.send(task);
	} catch (error) {
		res.status(400).send(error);
	}
};

exports.deleteTask = async (req, res, next) => {
	const id = req.params.id;

	try {
		const task = await Task.findByIdAndDelete(id);
		if (!task) {
			return res.status(404).send();
		}
		res.send('Task deleted successfully');
	} catch (error) {
		res.status(400).send(error);
	}
};
