var mongoose = require('mongoose'),
	Product = mongoose.model('Product'),
	SubCategory = mongoose.model('subCategory');
module.exports.createProduct = function(req, res, next) {

	var valid = req.body.name && Validations.isString(req.body.name) &&
		req.body.attributes  &&
		req.body.parentCategoryId && Validations.isString(req.body.parentCategoryId) ;

	// error if not valid
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