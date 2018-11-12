// require dependincies
var express = require('express');
var router = express.Router(),
porductController = require('../Controllers/product.controller.js');



// add routes

router.post('/product/create',productController.createProduct);


module.exports = router;
