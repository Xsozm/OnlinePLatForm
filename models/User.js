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
	password: {
		type: String,
		required: true,
	},
	role:{
		type :Number,
		required: true
	},
	address: {
		type: String,
	}

});
let User = mongoose.model('User', UserSchema);
module.exports = User;

// let firstuser =  new User ({
// 		email :'haz@gmail.com',
// 		username: 'hazem',
// 		password : '2',
// 		role:2,
// 		address:'guc'
// 	});	

	console.log(10);

	  
	//   async function run() {
	// 	// console.log(`mongoose version: ${mongoose.version}`);
	// 	await firstuser.save();
	//   }

	//   run();

// 	  User.find({}, function(err, data){
//         console.log(">>>> " + data );
//  });
	