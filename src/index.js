const app = require('./app');
const ENV = require('./config/config');

app.listen(ENV.PORT, () => {
	console.log(`Server listening on port ${ENV.PORT}`);
});
