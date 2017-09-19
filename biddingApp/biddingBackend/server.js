var express = require('express');
var app = express();
var path = require('path');
var generalRouter = express.Router();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var userRouter = express.Router();
var publicationRouter = express.Router();
var mongoose = require('mongoose');
var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});
app.use(morgan('dev'));

var promise = mongoose.connect('mongodb://localhost/biddingDB', {
	useMongoClient: true
});

userRouter.use(function(req, res, next){
	console.log(req.method, req.url);
	next();
});

userRouter.param('user', function(req, res, next, user){

	console.log('Doing Validations on ' + user);
	req.user = user;

	next();
}); 

userRouter.param('password', function(req, res, next, password){

	console.log('Doing Validations on ' + password);
	req.password = password;

	next();
}); 

publicationRouter.use(function(req, res, next){
	console.log(req.method, req.url);
	next();
});

publicationRouter.param('id', function(req, res, next, password){

	console.log('Doing Validations on ' + password);
	req.password = password;

	next();
}); 

publicationRouter.param('filters', function(req, res, next, filters){

	console.log('Doing Validations on ' + filters);
	req.filters = filters;

	next();
}); 


app.get('/', function(req, res){
	res.sendFile(path.join(__dirname + '/index.html'));
});

userRouter.get('/login/:user/:password', function(req, res){
	res.send('I will check if ' + req.params.user +' match with ' + req.params.password + '!');
});

userRouter.post('/singIn',function(req, res){
	res.send('I will send the data for a new user')
});

publicationRouter.get('/random', function(req, res){
	res.send('Im the top 20 publications randomly');
});

publicationRouter.get('/:id', function(req, res){
	res.send('Im the pub ' + req.params.id + '!');
});

publicationRouter.get('/filter/:filters',function(req, res){
	res.send('show all the posts for the applied filters');
});

app.use('/pub', publicationRouter);
app.use('/user', userRouter);

app.listen(1337);
console.log('1337 is the magic port');