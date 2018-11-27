let mongoose = require('mongoose')
let Product = require('../models/product.js');
let SubCategory = require('../models/subCategory');
let validator = require('lodash');


module.exports.createProduct = function(req, res) {


	var valid = req.body.name && validator.isString(req.body.name) &&
		req.body.description  && validator.isString(req.body.description)
		req.body.properties && validator.isArray(req.body.properties) &&  (req.body.subcategory_id) && validator.isString(req.body.subcategory_id) ;

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

	SubCategory.countDocuments({_id: product.subcategory_id}, function (err, count){
		  // if document exists
	    if(count>0){
					Product.create(product, function(err, newProduct) {
				    if (err) {
				      return res.status(422).json({
				        err: err,
				        msg: "Couldn't create product",
				        data: null
				      });
				    }
						else {
							var newProductID = {productId:newProduct._id};
							SubCategory.findOneAndUpdate({_id:product.subcategory_id},{$push:{products:newProductID}},{ new: true },(err, doc) => {
							    if (err) {
										return res.status(422).json({
										 err: err,
										 msg: "Couldn't create product",
										 data: null
									 });
							    }
									var ret = {newProduct:newProduct,doc:doc};
									return res.status(200).json({
										err: null,
										msg: "Created product successfully",
										// data: newProduct
										data: ret
									});

								});
						}
				  });
	    }
			else {
				return res.status(422).json({
					err: err,
					msg: "Couldn't create product; No subCategory with this id exists",
					data: null
				});
			}
	});

}


module.exports.updateProduct = function(req,res){
	var valid = req.body.name && validator.isString(req.body.name) &&
		req.body.description  && validator.isString(req.body.description)
		req.body.properties && validator.isArray(req.body.properties) &&  (req.body.subcategory_id) && validator.isString(req.body.subcategory_id) ;

	if (!valid) {
		return res.status(422).json({
			err: null,
			msg: 'One or More field(s) is missing or of incorrect type',
			data: null
		});
	}

	var pID = req.params.productID;
	var newProduct = {
		_id:pID,
		name:req.body.name,
		description:req.body.description,
		properties:req.body.properties,
		subcategory_id:req.body.subcategory_id
	};

	Product.findByIdAndUpdate(pID,{ $set: {
			name:req.body.name,
			description:req.body.description,
			properties:req.body.properties,
			subcategory_id:req.body.subcategory_id
		}}, { new: true },(err,product)=>{
		if(err || !product)
		{
			return res.status(422).json({
				err: err,
				msg: 'No product found with this id',
				data: null
			});
		}

			return res.status(200).json({
				err: null,
				msg: 'Product updated successfully',
				data: product
			});
	});

}
