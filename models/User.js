let mongoose = require('mongoose');
let UserSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	username: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	salt: {
		type: String,
		required: true,
	},
	hash: {
		type: String,
		required: true,
	},
	role:{
		type :Number,
		required: true
	},
	address: {
		type: String,
	},
	resetPasswordToken: String,
  resetPasswordExpires: Date

});
let User = mongoose.model('User', UserSchema);
module.exports = User;
