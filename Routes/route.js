var express = require('express');
var router = express.Router();
let User = require('../models/User.js');
let Product = require('../models/product.js');
let Category = require('../models/category.js');
let porductController = require('../Controllers/product.controller.js');
let SubCategoryController = require('../Controllers/SubCategoryController.js');
const cart = require ('../Controllers/CartController');
const AdminController = require('../Controllers/AdminController');
const UserController = require('../Controllers/UserController');
const JSON = require('circular-json');

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



router.post('/product/create',porductController.createProduct);
router.get('/product/findBySubCategory/:subCategory',porductController.findBySubCategories);
router.post('/subcategory/create',SubCategoryController.create);
router.get('/products/:productid' , cart.ViewProducts);
router.get('/products/:productid/:sample' , cart.AddingProductTOCart);


router.get('/admin/viewRequests/',AdminController.ViewRequests);
router.post('/admin/approveRequest/',AdminController.ApproveRequest);
router.post('/admin/rejectRequest/',AdminController.RejectRequest);


router.post('/user/register/', UserController.Register);
module.exports = router;
