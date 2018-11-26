const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
var router = require('./Routes/route');
const crypto = require('crypto');
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000;;
var bodyParser = require('body-parser');
bodyParser = require('body-parser');
const expressValidator = require('express-validator')



mongoose.connect(process.env.CONNECTION_STRING);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('connected to the DataBase')
	// we're connected!
});






app.listen(PORT, () => {
	console.log('app listening on port 3000!');
});
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/',router);

app.get('/', (req, res) => {
	res.send('Hello World!');
});
