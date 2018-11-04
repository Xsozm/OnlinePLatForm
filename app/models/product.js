var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    },
    value:Number,
    subcategory_id: [{type:Schema.Types.ObjectId,ref:'subcategory'}]
})

var product = mongoose.model("product", productSchema);

module.exports = product;
