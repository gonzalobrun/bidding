var express = require('express');
var publication = require('../controllers/publicationController');
var user = require('../controllers/userController');
var userRouter = express.Router();
var publicationRouter = express.Router();

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

module.exports = function (app) {

	app.get('/', function(req, res){
		res.json({ message: 'Hooray! Welcome to our api'});
	});

	userRouter.post('/', [user.logReq, user.createUser]);

	userRouter.get('/:userId', [user.logReq, user.logUser]);

	userRouter.put('/:userId', [user.logReq, user.updateUser]);

	userRouter.delete('/:userId', [user.logReq, user.deleteUser]);

	publicationRouter.get('/random', [publication.logReq, publication.randomPub]);

	publicationRouter.get('/:pub',[publication.logReq, publication.getById]);

	publicationRouter.get('/filter/:filters', [publication.logReq, publication.getWithFilters]);

	app.use('/pub', publicationRouter);
	app.use('/user', userRouter);
};