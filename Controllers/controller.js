const mongoose = require ('mongoose');
const product  = mongoose.model('Product')
const cart     = mongoose.model('Cart')

module.exports =
{
    ViewProducts : async  (req, res, next) => {

        var x = await product.find({_id: req.params.productid});

        if(x.length == 0)
        {
            return res.status(404).json
            ({
                err  : "Not Found",
                msg  : "The product is not Found",
                data : null
            })
        }else
        {
            return res.status(404).json
            ({
                err : null,
                msg : "The product is Found & ready for display",
                data: x
            })
        }

    },
    AddingProductTOCart : async (req, res, next) =>{

        var y = await cart.find().populate('products.product').exec(function (err,data){
            if(err) return handleError(err);

            console.log(data.products.product.name);
        });
        

    }


}
