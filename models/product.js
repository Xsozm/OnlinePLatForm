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
    }

})

var Product = mongoose.model("Product", productSchema);

module.exports = Product;
