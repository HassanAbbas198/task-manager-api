const mongoose = require('mongoose');
const ENV = require('../config/config');

const MONGO_URL = `mongodb+srv://${ENV.MONGODB_CREDENTIALS}@cluster0-rbus3.mongodb.net/${ENV.DB_NAME}?retryWrites=true&w=majority`;

mongoose
	.connect(MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch(() => {
		console.log('Failed!');
	});
