const express = require('express')
const router  = express.Router();
var app = express()
const products = require ('../Controllers/controller')


router.get('/products/:productid' , products.ViewProducts);
router.get('/products/:prodid' , products.AddingProductTOCart);

  module.exports = router;
