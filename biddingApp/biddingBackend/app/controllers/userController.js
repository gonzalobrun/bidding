'use strict'
var mongoose = require('mongoose');
var User = require('../models/user');
var UserModel = mongoose.model('Users');

function createUser (req, res) {

	var user = new User(req.body);

	user.save(function(err, user) {
		if(err){
			if(err.code == 11000){
				return res.status(404).json({ success: false, message: 'This username alredy exist.', user: null});
			}
			else {
				return res.json({ success: false, message: err, user: null});
			}
		}
		
		else {
			res.json({ success: true, message: 'User Created!', user: user});
		}
	});
}

function logUser (req, res) {
	//res.send('Check password for the user ' + req.params.userId);
	UserModel.find({username: req.body.username, password: req.body.password}, function(err, user){

		if(err) {
			res.json({success: false,  message: err, user: null, logged: false});
		}
		else {
			var logged = false;
			if(user.length === 1) {
				logged = true;
				res.json({success: true,  message: 'User Logged', user: user, logged : logged});
			}
			else {
				res.json({success: false, message: 'Check your username or passowrd', user: null, logged : logged});
			}
		}
	});
};

function updateUser (req, res){
	
	var query = { _id: req.params.userId },
		update = {	name: req.body.name, 
					password: req.body.password, 
					country: req.body.country, 
					province: req.body.province, 
					city: req.body.city},
		options = {multi: false};

	UserModel.update(query, update, options, function(err, numAffected){
		if(err){
			res.send(err);
		}
		else{
			var userUpdated = false;
			if(numAffected.nModified === 1) {
				userUpdated = true;
			}
			res.json({message:'User updated', userUpdated: userUpdated});
		}
	});
}

function deleteUser(req, res){
	res.send('this will delete the user ' + req.params.userId);
}

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