var mongoose = require('mongoose'),
Product = mongoose.model('Product');




module.exports.createProduct = async function(req, res, next) {

  var valid = req.body.name && Validations.isString(req.body.name) &&
      req.body.description && Validations.isString(req.body.description) &&
      req.body.value && typeof req.body.value == "number"&&
      req.body.subcategory_id ;

    // error if not valid
    if (!valid) {
      return res.status(422).json({
        err: null,
        msg: 'One or More field(s) is missing or of incorrect type',
        data: null
      });
    }

    var product = {
      name: req.body.name,
      description: req.body.description,
      value:req.body.value,
      subcategory_id:req.body.subcategory_id
    };


  Product.create(product, function(err, newProduct) {
    if (err) {
      return res.status(422).json({
        err: err,
        msg: "Couldn't create product",
        data: null
      });
    }
    return res.status(200).json({
      err: null,
      msg: "Created product successfully",
      data: newProduct
    });

  });

}
