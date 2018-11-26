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
    products:[{productId:String}],
    created_at: {
      type: Date,
    },
    updated_at: {
      type: Date,
    },
});

let SubCategory =mongoose.model('SubCategory', SubCategorySchema);

module.exports = SubCategory;