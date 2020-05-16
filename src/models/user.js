const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true,
		lowercase: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error('Invalid Email address!');
			}
		},
	},
	password: {
		type: String,
		required: true,
		minlength: 5,
		trim: true,
		validate(value) {
			if (value.includes('password')) {
				throw new Error('Password cannot contain "password"');
			}
		},
	},
	age: {
		type: Number,
		default: 0,
		validate(value) {
			if (value < 0) {
				throw new Error('Age must be a postive number');
			}
		},
	},
	tokens: [
		{
			token: {
				type: String,
				required: true,
			},
		},
	],
});

// hashing the password before storing it
userSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		const hashedPassword = await bcrypt.hash(this.password, 10);
		this.password = hashedPassword;
	}
	next();
});

// generating a JWT
userSchema.methods.generateAuthToken = async function () {
	const user = this;
	const token = jwt.sign({ _id: user._id.toString() }, 'thisisalongsecret');

	user.tokens = user.tokens.concat({ token });
	await user.save();

	return token;
};

userSchema.methods.toJSON = function () {
	const user = this;

	const userObject = user.toObject();

	delete userObject.password;
	delete userObject.tokens;

	return userObject;
};

module.exports = mongoose.model('User', userSchema);
