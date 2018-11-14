
const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const crypto = require('crypto');
const cookie = require('cookie');
const nonce = require('nonce')();
const querystring = require('querystring');
const request = require('request-promise');
const mongoose = require('mongoose');

const db = mongoose.connect(process.env.CONNECTION_STRING,{
})  
    .then(() => console.log('DB connected'))
	.catch(err => console.log(err));
	
const PORT = process.env.PORT || 3000;;
const router = require('./Routes/route');

// db.once('connected', function (err) {
// 	if (err) { return console.error(err) }
// 	else
// 		console.log("connected");

// })

app.listen(PORT, () => {
	console.log('app listening on port 3000!');
});
app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.use('/',router)

require('./models/User');
require('./models/subCategory');
require('./models/product');
require('./models/Cart');
