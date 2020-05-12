const mongoose = require('mongoose');

mongoose
	.connect(
		'mongodb+srv://Hassan:TpdvQ4ruOg29iNxZ@cluster0-rbus3.mongodb.net/task-manager?retryWrites=true&w=majority',
		{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
	)
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch(() => {
		console.log('Failed!');
	});
