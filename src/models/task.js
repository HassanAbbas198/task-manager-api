const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
	{
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
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);
