const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
var router = require('./Routes/route');
const crypto = require('crypto');
const cookie = require('cookie');
const nonce = require('nonce')();
const querystring = require('querystring');
const request = require('request-promise');
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000;;
var DB_URI = "mongodb://localhost:27017/Platform"; // "Platform" is the db name in mongo
var bodyParser = require('body-parser');



app.use(bodyParser.urlencoded({extended: false}));

mongoose.connect(DB_URI);

app.use(router);
app.listen(PORT, () => {
	console.log('app listening on port 3000!');
});
app.get('/', (req, res) => {
	res.send('Hello World!');
});


