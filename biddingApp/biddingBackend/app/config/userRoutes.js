var express = require('express');
var userRoutes = express.Router();
var user = require('../controllers/userController');

userRoutes.param('user', function(req, res, next, user){

	console.log('Doing Validations on ' + user);
	req.user = user;

	next();
}); 

userRoutes.param('password', function(req, res, next, password){

	console.log('Doing Validations on ' + password);
	req.password = password;

	next();
}); 

module.exports = function(app){
	userRoutes.post('/:userId', [user.logReq, user.createUser]);

	userRoutes.get('/:userId', [user.logReq, user.logUser]);

	userRoutes.put('/:userId', [user.logReq, user.updateUser]);

	userRoutes.delete('/:userId', [user.logReq, user.deleteUser]);
	
	app.use('/user', userRoutes);
}