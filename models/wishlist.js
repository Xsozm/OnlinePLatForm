var mongoose = require('mongoose');

var WishlistSchema = mongoose.Schema({
    user_id:{type:Schema.Types.ObjectId,ref:'User'},
    products: [{type:Schema.Types.ObjectId,ref:'Product'}]
})

var Wishlist = mongoose.model("Wishlist", WishlistSchema);

module.exports = Wishlist;
