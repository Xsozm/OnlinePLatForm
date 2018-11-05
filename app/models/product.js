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
    subcategory_id: [{type:Schema.Types.ObjectId,ref:'Subcategory'}]
})

var product = mongoose.model("Product", productSchema);

module.exports = product;
