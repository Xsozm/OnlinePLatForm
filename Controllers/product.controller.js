let mongoose = require('mongoose')
let Product = require('../models/product.js');
let SubCategory = require('../models/subCategory');
let whishlist = require('../models/wishlist');
let validator = require('lodash');


module.exports.createProduct = function(req, res) {


	var valid = req.body.name && validator.isString(req.body.name) &&
		req.body.description  && validator.isString(req.body.description) &&
		req.body.value && validator.isNumber(req.body.value) &&
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
		value: req.body.value,
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
		req.body.description  && validator.isString(req.body.description) &&
		req.body.value && validator.isNumber(req.body.value) &&
		req.body.properties && validator.isArray(req.body.properties) &&  (req.body.subcategory_id) && validator.isString(req.body.subcategory_id) ;

	if (!valid) {
		return res.status(422).json({
			err: null,
			msg: 'One or More field(s) is missing or of incorrect type',
			data: null
		});
	}

	var pID = req.params.productID;


	Product.findByIdAndUpdate(pID,{ $set: {
			name:req.body.name,
			description:req.body.description,
			value: req.body.value,
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
module.exports.DeleteAProduct = function (res ,req ,next){
	var result = Product.deleteOne({_id : req.params.productid});

}

module.exports.getRandom = (req,res,next)=>{

	var valid = req.params.subCategoryID && validator.isString(req.params.subCategoryID);

	if (!valid) {
		return res.status(422).json({
			err: null,
			msg: 'One or More field(s) is missing or of incorrect type',
			data: null
		});
	}

	Product.find({subcategory_id:req.params.subCategoryID}).limit(3).exec(function(err,products){
	return res.status(200).json({
		err: null,
		msg: 'Products retreived successfully',
		data: products
	});
});


};


module.exports.viewingWhishlist = async function (req ,res ,next){

	list = await whishlist.find({user_id:req.params.userID});

	if(list<=0){
		return res.status(404).json({
			err: 'Error',
			msg: 'No data in wishlist',
			data: null
		});
	}else{
		prod = whishlist.products.length;
		for (let index = 0; index < prod; index++) {
			const element = prod[index];

			Product.find({Product_id:element}).exec(function(err,product){
				return res.status(200).json({
					err: null,
					msg: 'Products retreived successfully',
					data: product
				});
			});
			
		}
	}
	
};