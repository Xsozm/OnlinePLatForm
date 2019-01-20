var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    subCategories: [{type: Schema.Types.ObjectId,ref:'SubCategory'}],
    created_at: {
  		type: Date,
  		default : Date.now
  	},
  	updated_at: {
  		type: Date,
  	},
});

let Category=  mongoose.model('Category', CategorySchema);
module.exports=Category;
