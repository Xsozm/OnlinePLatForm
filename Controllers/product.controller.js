let mongoose = require('mongoose')
let Product = require('../models/product.js');
let SubCategory = require('../models/subCategory');
let validator = require('lodash');


module.exports.createProduct = function(req, res) {

	//validation
	var valid = req.body.name && validator.isString(req.body.name) &&
		req.body.description  &&
		req.body.properties && (req.body.subcategory_id) && validator.isString(req.body.subcategory_id) ;
//	res.status(200).json(valid)

	if (!valid) {
		return res.status(422).json({
			err: null,
			msg: 'One or More field(s) is missing or of incorrect type',
			data: null
		});
	}


	let product = {
		name: req.body.name,
		description: req.body.description,
		properties: req.body.properties,
		subcategory_id: req.body.subcategory_id
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

    });

  });

}
