const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
var router = require('./Routes/route');
const crypto = require('crypto');
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000;;
var bodyParser = require('body-parser');



mongoose.connect(process.env.CONNECTION_STRING);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('connected')
	// we're connected!
});






app.listen(PORT, () => {
	console.log('app listening on port 3000!');
});
app.use(bodyParser.urlencoded({extended: false}));
app.use('/',router);
app.get('/', (req, res) => {
	res.send('Hello World!');
});
