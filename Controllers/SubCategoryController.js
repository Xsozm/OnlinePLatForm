var mongoose = require('mongoose');
let	SubCategory = require('../models/subCategory.js');
let validator = require('lodash');

module.exports.create = function(req, res, next) {

	var valid = req.body.name && validator.isString(req.body.name) &&
		req.body.attributes  &&
		req.body.parentCategoryId && validator.isString(req.body.parentCategoryId) ;
//	res.status(200).json(valid)

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
	//5bfc5ed9ce564b2d9c1b898e
	//return res.status(200).json(sub)

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