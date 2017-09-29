var express = require('express');
var app = express();
var path = require('path');
var routes = require('./app/config/routes');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var port = process.env.PORT || 8080;
var User = require('./app/models/user');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/biddingDB', {
	useMongoClient: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});
app.use(morgan('dev'));

routes(app);

app.use(function(req, res){
	res.status(500).send('Page not found.')
});

app.listen(port);
console.log('Magic happens on port ' + port);