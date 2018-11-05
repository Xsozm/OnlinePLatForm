const mongoose  = require('mongoose');

const Schema    = mongoose.Schema;

const Orders = new Schema ({

    products:{
        type : String,
    },
    price : {
        type: Number
    },
    date:{
        type: Date,
        default : Date.now
    },
    delivery:{
        type : Number
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User' // this is the name of model user 
    }

});

mongoose.model('Orders' , Orders);