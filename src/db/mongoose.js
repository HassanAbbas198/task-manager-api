const mongoose = require('mongoose');

mongoose
	.connect(
		`mongodb+srv://Hassan:${process.env.MONGO_ATLAS_PW}@cluster0-rbus3.mongodb.net/task-manager?retryWrites=true&w=majority`,
		{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
	)
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch(() => {
		console.log('Failed!');
	});
