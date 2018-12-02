var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SubCategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    attributes:  [{
    	//array of jsons

    }],
    parentCategoryId: String,
    products:[{
      productId:String,
      _id:false
    }],
    created_at: {
	    type: Date,
	    default : Date.now
    },
    updated_at: {
      type: Date,
    },
});

let SubCategory =mongoose.model('SubCategory', SubCategorySchema);

module.exports = SubCategory;
