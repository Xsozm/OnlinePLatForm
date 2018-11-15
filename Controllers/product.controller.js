var mongoose = require('mongoose'),
Product = mongoose.model('Product'),
SubCategory = mongoose.model('subCategory');




module.exports.createProduct = function(re1q, res, next) {

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

module.exports.findBySubCategories = function(req, res, next) {

  var subCategoryName = req.params.subCategory;

  SubCategory.find({
    name:subCategoryName
  }).exec(function(err, subCategory) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        err: null,
        msg: 'Error Occured while retrieving data'
      });
    }

    Product.find({
      '_id':{ $in: subCategory}
    }).exec(function(err, products){

      return res.status(200).json({
        err: null,
        msg: 'finished successfully',
        data: products
      });

    };

  });

}
