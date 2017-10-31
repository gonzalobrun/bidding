'use strict'
var mongoose = require('mongoose');
var User = require('../models/user');
var UserModel = mongoose.model('Users');

function createUser (req, res) {
	var user = new User(req.body);
	user.save(function(err, user) {
		if(err){
			if(err.code == 11000){
				return res.status(412).json({ success: false, message: 'This username alredy exist.', user: null});
			}
			else {
				return res.json({ success: false, message: err, user: null});
			}
		}		
		else {
			res.json({ success: true, message: 'User Created!', user: user});
		}
	});
};

function logUser (req, res) {	
	UserModel.find({username: req.body.username, password: req.body.password}, function(err, user){		
		if(err) {
			res.json({success: false,  message: err, user: null});
		}
		else {			
			if(user.length === 1) {
				res.json({success: true,  message: 'User Logged', user: user});
			}
			else {
				res.status(412).json({success: false, message: 'Check your username or passowrd', user: null});
			}
		}
	});
};

//TODO: Implement this functionality, it can be tested until exist a loggued user functionality on the application.
function updateUser (req, res){	
	var query = { _id: req.params.userId },
		update = {	name: req.body.name, 
					password: req.body.password, 
					country: req.body.country, 
					province: req.body.province, 
					city: req.body.city 
				},
		options = { multi: false };
	UserModel.update(query, update, options, function(err, numAffected){
		if(err){
			res.send(err);
		}
		else{
			if(numAffected.nModified === 1) {
				res.json({success: true, message:'User updated', update: update });
			}
			else {
				res.status(412).json({success: false, message:'The user couldn\'t be updated', update: null});
			}			
		}
	});
};

//TODO: This will not actually delete a user, it will a disable flag
//TODO: Implement disable flag on User
function deleteUser(req, res){
	res.send('this will delete the user ' + req.params.userId);
};

function logReq (req, res, next){
	console.log(req.method, req.url);
	next();
};

module.exports = {
	createUser : createUser,
	logUser : logUser,
	updateUser : updateUser,
	deleteUser : deleteUser,
	logReq: logReq
};