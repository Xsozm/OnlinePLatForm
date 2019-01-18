let mongoose = require('mongoose');
let RequestSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	name: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	mob: {
		type: String,
		required: true,
	},
	address:{
		type :String,
		required: true
	},
	description: {
		type: String,
		required: true

	},
	status: {
		type: String, default: 'Not Reviewed'
	}


});
let Request = mongoose.model('Request', RequestSchema);
module.exports = Request;
