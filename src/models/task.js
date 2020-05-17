const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
	description: {
		type: String,
		required: true,
		trim: true,
	},
	completed: {
		type: Boolean,
		default: false,
	},
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
});

module.exports = mongoose.model('Task', taskSchema);
