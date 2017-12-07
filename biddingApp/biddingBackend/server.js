var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');


//I should import the models once. 
//var User = require('./app/models/user');
var userRoutes = require('./app/config/userRoutes');

//var Publication = require('./app/models/Publication');
var publicationRoutes = require('./app/config/publicationRoutes');

//var Publication = require('./app/models/Taxonomy');
var taxonomyRoutes = require('./app/config/taxonomyRoutes');

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

app.use('/upload',express.static(path.join(__dirname, '/upload')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

userRoutes(app);
publicationRoutes(app);
taxonomyRoutes(app)

app.use(function(req, res){
	res.status(500).send('Internal Server Error...');
});
app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port, "0.0.0.0");
console.log('Magic happens on port ' + port);