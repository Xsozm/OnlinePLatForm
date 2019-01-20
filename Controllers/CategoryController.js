var mongoose = require('mongoose');
let	Category = require('../models/category.js');
let Product = require('../models/product.js');
let validator = require('lodash');

module.exports.create = function(req, res, next) {

	var valid = req.body.name && validator.isString(req.body.name) &&
		req.body.description  && validator.isString(req.body.description) ;

	if (!valid) {
		return res.status(422).json({
			err: null,
			msg: 'One or More field(s) is missing or of incorrect type',
			data: null
		});
	}

	var category = {
		name: req.body.name,
		description: req.body.description
	};


	Category.create(category, function(err, newCategory) {
		if (err) {
			return res.status(422).json({
				err: err,
				msg: "Couldn't create category",
				data: null
			});
		}
		return res.status(200).json({
			err: null,
			msg: "Created category successfully",
			data: newCategory
		});

	});

}
