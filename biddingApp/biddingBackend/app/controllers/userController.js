'use strict'
var mongoose = require('mongoose');
var User = require('../models/user');
var UserModel = mongoose.model('User');

function createUser (req, res) {

	//console.log(req.body);
	var user = new User(req.body);

	// user.name = req.body.name;
	// user.username = req.body.userName;
	// user.password = req.body.password;
	// user.country = req.body.country;
	// user.province = req.body.province;
	// user.city = req.body.city;

	user.save(function(err, user) {
		if(err){
			if(err.code == 11000){
				return res.json({ success: false, message: 'This username alredy exist.', user: user});
			}
			else {
				return res.send(err);
			}
			console.log(err);
		}
		else {
			res.json({message: 'User Created!', user: user});
		}
	});
}

function logUser (req, res) {
	res.send('Check password for the user ' + req.params.userId);
}

function updateUser (req, res){
	res.send('this will delete the user ' + req.params.userId);
	next();
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