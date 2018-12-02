var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    },
	properties: [{  }],
    subcategory_id: {
	    type: mongoose.Schema.Types.ObjectId,
	    ref: 'SubCategory'
    },
	created_at: {
		type: Date,
		default : Date.now
	},
	updated_at: {
		type: Date,
	},
    price: Number,
    photos: {
  		type: [String]
  	},
    rating:{
  		type: Number
  	}

})

var Product = mongoose.model("Product", productSchema);

module.exports = Product;
