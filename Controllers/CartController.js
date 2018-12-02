const mongoose      = require ('mongoose');
const product       = require('../models/product')
const subcategory   = require('../models/subCategory')
const cart          = require('../models/Cart')

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
            return res.status(202).json
            ({
                err : null,
                msg : "The product is Found & ready for display",
                data: x
            })
        }

    },
    AddingProductTOCart : async (req, res, next) =>{

        var y = await product.find({_id :req.params.productid});

        if(y.length != 0){  
            console.log('tmam keda');
            var c = new cart ({

                user : req.params.userid,
                products:
                [{
                    product  : req.params.productid,
                    isSample : req.params.sample 
                }]

            });

            async function run() {
                await c.save();
            }
            
            run();

            return res.status(202).json
            ({
                err : "the product  inserted",
                msg : "the product is set into the cart ",
                data: y
            })
            

        }else{

            return res.status(404).json
            ({
                err : "the product is not inserted",
                msg : "check the product is found or deleted ",
                data: null
            })

        }
        

    },
    ShowProductsInCart: async (req ,res ,next) => {

        var carts = await cart.find();
        var pro  = await product.find(); 

        for(i = 0; i<carts.length ;i++){
           var obj =  carts[i];
          for(j = 0 ;j < pro.length ;j++){
             for(k = 0 ; k <obj.products.length ;k++ ){
                if(obj.products[k].product == pro[j].id){
                    console.log("found one");
                    var pro2 = await product.find({_id:obj.products[k].product});
                    return res.status(202).json({
                        err : null,
                        msg  :"found products in cart",
                        data :pro2 
                    });
                }else{
                    console.log("no products in cart here");
                    return res.status(404).json({
                        err  :"No products in the cart",
                        msg  :"check his/her authentication",
                        data : null
                    });
                }
             } 
          }

        }
    }


}
