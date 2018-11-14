const mongoose  = require('mongoose');

const Schema    = mongoose.Schema;

const Cart      = new Schema ({

    user : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    products : [{
        product :{ type : Schema.Types.ObjectId , ref: 'Product'},
        isSample:{ type :Boolean , default : false}
    }]

});

let Carts =  mongoose.model('Cart' , Cart);
module.exports = Carts


// let cart1 =  new Carts ({
//     user : '5be4bea675ecd051f71591b6',
//     products : [{product : '5beb43438d33cd3199eb6ff6' ,isSample : true}]
// });	


  
//   async function run() {
// 	// console.log(`mongoose version: ${mongoose.version}`);
// 	await cart1.save();
//   }

//   run();

//   Carts.find({}, function(err, data){
//         console.log(">>>> " + data );
//  });
