const mongoose  = require('mongoose');

const Schema    = mongoose.Schema;

const Cart      = new Schema ({

    user : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    products : [{
        product :{ type : Schema.Types.ObjectId , ref: 'Product'},
        isSample:{ type :Boolean}
    }]

});

mongoose.model('Cart' , Cart);