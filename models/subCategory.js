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

let  SubCategory = mongoose.model('SubCategory', SubCategorySchema);
module.exports = SubCategory;


// let subcategory1 =  new SubCategory ({
//   name:'upperbody',
//   attributes : {},
//   parentCategoryId : '1',
//   products:[{productId :'49'}],
//   created_at : '10/10/2018',
//   updated_at : '12/12/2018'
// });	

// subcategory1.attributes.set('short','H.M');
// subcategory1.attributes.set('hats','Nike');



// async function run() {
// // console.log(`mongoose version: ${mongoose.version}`);
// await subcategory1.save();
// }

// run();

// SubCategory.find({}, function(err, data){
//   console.log(">>>> " + data );
// });