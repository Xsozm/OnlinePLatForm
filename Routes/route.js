var express = require('express');
let User = require('../models/User.js');
let Product = require('../models/product.js');
let Category = require('../models/category.js');
let SubCategory = require('../models/subCategory.js');
let porductController = require('../Controllers/product.controller.js');
let SubCategoryController = require('../Controllers/SubCategoryController.js');
let CategoryController = require('../Controllers/CategoryController.js');
const cart = require ('../Controllers/CartController');
const AdminController = require('../Controllers/AdminController');
const UserController = require('../Controllers/UserController');
const JSON = require('circular-json');
var router = express.Router();





router.post('/product/create',porductController.createProduct);
router.put('/product/:productID',porductController.updateProduct);
// Returns 3 suggested products belonging to subCategory with id = subCategoryID
router.get('/product/random/:subCategoryID',porductController.getRandom);

router.get('/products/:productid' , cart.ViewProducts);
router.get('/products/:productid/:sample' , cart.AddingProductTOCart);

router.post('/category/create',CategoryController.create);

// Posts a subCategory
// For the JSON body check the schema in the models folder
router.post('/subcategory/create',SubCategoryController.create);

// Find all products belonging to a subCategory with the id specicfied in the URL
router.get('/subcategory/findProductsBySubCategory/:subCategoryID',SubCategoryController.findProductsBySubCategory);

// Finds all the products belonging to a subCategory with the id specicfied in the URL
// Within a range of prices
// Takes 2 paramaeters minPrice & maxPrice, both are numbers
router.get('/subcategory/findProductsByPrice/:subCategoryID',SubCategoryController.findProductsByPrice);

// Finds all the products belonging to a subCategory with the id specicfied in the URL
// Within a range of ratings
// Takes 2 paramaeters minRate & maxRate, both are numbers
router.get('/subcategory/findProductsByRating/:subCategoryID',SubCategoryController.findProductsByRating);

router.get('/admin/viewRequests/',AdminController.ViewRequests);
router.post('/admin/approveRequest/',AdminController.ApproveRequest);
router.post('/admin/rejectRequest/',AdminController.RejectRequest);


router.post('/user/register/', UserController.Register);
router.post('/order/make/', UserController.makeorder);
router.post('/user/Login/', UserController.Login);
router.post('/user/request/',UserController.makeRequest);
router.post('/user/forgot/',UserController.Forgot);
router.get('/reset/:token',UserController.resetpass);
router.post('/user/changepass',UserController.changepass);

module.exports = router;
