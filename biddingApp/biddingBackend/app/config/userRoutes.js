var express = require('express');
var userRoutes = express.Router();
var user = require('../controllers/userController');

//MIDDLEWARES
userRoutes.param('userId', function(req, res, next, user){

	console.log('Doing Validations on ' + user);
	req.user = user;

	next();
});

module.exports = function(app){
	
	userRoutes.post('/', [user.logReq, user.createUser]);

	userRoutes.post('/login', [user.logReq, user.logUser]);

	userRoutes.post('/:userId', [user.logReq, user.updateUser]);

	userRoutes.delete('/:userId', [user.logReq, user.deleteUser]);
	
	app.use('/user', userRoutes);
}