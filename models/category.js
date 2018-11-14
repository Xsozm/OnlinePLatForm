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
      required: true
    },
    updated_at: {
      type: Date,
      required: true
    },
});

mongoose.model('Category', CategorySchema);
