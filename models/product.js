var mongoose = require('mongoose');

const Schema    = mongoose.Schema;


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
    properties: [{ attribute: String, value: String }], 
    subcategory_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'SubCategory' 
    } 
})

var Product = mongoose.model("Product", productSchema);

module.exports = Product;


    //     let product1 =  new Product ({
    //         name:'tshirt',
    //         description : 'size small',
    //         properties:[{attribute:'cotton',value:'50 EGY'} ,{attribute:'polyster',value:'100 EGY'}],
    //         subcategory_id : '5beb41ce4885c42f52f9aad6'
           
    //     });	

    //     async function run() {
	// 	// console.log(`mongoose version: ${mongoose.version}`);
	// 	await product1.save();
	//   }

    //   run();
      
    //   Product.find({}, function(err, data){
    //     console.log(">>>> " + data );
    // });