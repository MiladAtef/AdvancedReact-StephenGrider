const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true
	},
	password: { type: String, required: true }
});

userSchema.pre('save', async function(next) {
	const user = this;
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8);
	}
	next();
});

userSchema.methods.comparePassword = async function(candidatePassword, cb) {
	const user = this;
	try {
		const isMatch = await bcrypt.compare(candidatePassword, user.password);
		if (!isMatch) {
			return cb(null, false);
		} else {
			return cb(null, isMatch);
		}
	} catch (err) {
		return cb(err);
	}
};

module.exports = mongoose.model('User', userSchema);
