var mongoose = require('mongoose');

const Schema    = mongoose.Schema;


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
    subcategory_id: [{type:Schema.Types.ObjectId,ref:'SubCategory'}]
})

var product = mongoose.model("Product", productSchema);

module.exports = product;
