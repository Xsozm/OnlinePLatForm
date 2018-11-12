// require dependincies
var express = require('express');
var router = express.Router();
let User = require('../models/User.js');
let Product = require('../models/product.js');
let Category = require('../models/category.js');

router.post('/hazem',function (req, res) {
	let name = req.body.name;
	let description = req.body.description;
	let properties = req.body.properties;
	let subcategory_id = req.body.subcategory_id;
	Product.create({"name":name,"description":description,"properties":properties,"subcategory_id":subcategory_id},function (error, product) {
		if(error)
		res.send(error)
		res.send(product);
	});




	value
});


// add routes




module.exports = router;
