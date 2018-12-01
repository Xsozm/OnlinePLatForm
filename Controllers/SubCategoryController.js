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

	var valid = req.params.subCategoryID && validator.isString(req.params.subCategoryID);

	if (!valid) {
		return res.status(422).json({
			err: null,
			msg: 'One or More field(s) is missing or of incorrect type',
			data: null
		});
	}
  var subCategoryID = req.params.subCategoryID;


  SubCategory.find({
    _id:subCategoryID
  }).exec(function(err, subCategory) {
    if (err || !subCategory) {
      return res.status(500).json({
        err: null,
        msg: 'No such subCategory found',
				data: null
      });
    }

    Product.find({
      '_id':{ $in: subCategory[0].products.map(pID => pID.productId)}
    }).exec(function(err, products){

      return res.status(200).json({
        err: null,
        msg: 'finished successfully',
        data:products
      });

    });

  });

}

module.exports.findProductsByPrice = function(req,res,next) {
	var valid = req.query.minPrice && !isNaN(req.query.minPrice) &&
							req.query.maxPrice && !isNaN(req.query.maxPrice)&&
							req.params.subCategoryID && validator.isString(req.params.subCategoryID)&&
							req.query.maxPrice >= req.query.minPrice;

	if (!valid) {
		return res.status(422).json({
			err: null,
			msg: 'One or More field(s) is missing or of incorrect type',
			data: null
		});
	}

		Product.find({
			subcategory_id:req.params.subCategoryID,
			value:{$gte:req.query.minPrice , $lte:req.query.maxPrice}
		}).exec((err,products)=>{
			if(err || !products)
			{
				return res.status(422).json({
					err: err,
					msg: 'No products found',
					data: null
				});
			}

			return res.status(200).json({
				err: null,
				msg: 'Query executed successfully',
				data: products
			});
		});
	}


	module.exports.findProductsByRating = function(req,res,next) {
		var valid = req.query.minRate && !isNaN(req.query.minRate) &&
								req.query.maxRate && !isNaN(req.query.maxRate)&&
								req.params.subCategoryID && validator.isString(req.params.subCategoryID)&&
								req.query.maxRate >= req.query.minRate;

		if (!valid) {
			return res.status(422).json({
				err: null,
				msg: 'One or More field(s) is missing or of incorrect type',
				data: null
			});
		}

			Product.find({
				subcategory_id:req.params.subCategoryID,
				rating:{$gte:req.query.minRate , $lte:req.query.maxRate}
			}).exec((err,products)=>{
				if(err || !products)
				{
					return res.status(422).json({
						err: err,
						msg: 'No products found',
						data: null
					});
				}

				return res.status(200).json({
					err: null,
					msg: 'Query executed successfully',
					data: products
				});
			});
		}
