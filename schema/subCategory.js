var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SubCategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    attributes:  {
      type: Map,
      of: String
    },
    parentCategoryId: String,
    products:[{productId:String}],
    created_at: {
      type: Date,
      required: true
    },
    updated_at: {
      type: Date,
      required: true
    },
});

mongoose.model('SubCategory', SubCategorySchema);
