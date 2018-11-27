var mongoose = require('mongoose');
let	SubCategory = require('../models/subCategory.js');
let Product = require('../models/product.js');
let validator = require('lodash');

module.exports.create = function(req, res, next) {

	var valid = req.body.name && validator.isString(req.body.name) &&
		req.body.attributes  && validator.isArray(req.body.attributes)
		req.body.parentCategoryId && validator.isString(req.body.parentCategoryId) ;

	if (!valid) {
		return res.status(422).json({
			err: null,
			msg: 'One or More field(s) is missing or of incorrect type',
			data: null
		});
	}

	var sub = {
		name: req.body.name,
		attributes: req.body.attributes,
		parentCategoryId:req.body.parentCategoryId,
	};


	SubCategory.create(sub, function(err, newsub) {
		if (err) {
			return res.status(422).json({
				err: err,
				msg: "Couldn't create sub",
				data: null
			});
		}
		return res.status(200).json({
			err: null,
			msg: "Created sub successfully",
			data: newsub
		});

	});

}

module.exports.findProductsBySubCategory = function(req, res, next) {

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
