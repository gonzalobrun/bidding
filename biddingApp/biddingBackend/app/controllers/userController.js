'use strict'
var mongoose = require('mongoose');
var User = require('../models/user');

function createUser (req, res) {

	var user = new User(req.body);

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

	var user = new User();
	console.log('+++++++++++++++++ ' + user);
	//res.send('Check password for the user ' + req.params.userId);
	user.find(function(err, user){
		if(err){
			res.send(err);
		}
		else{
			res.json({message: 'The user!', user});
		}
	});
};

function updateUser (req, res){
	//res.send('this will delete the user ' + req.params.userId);
	user.finOneAndUpdate({username: req.params.username}, req.body, {new: true}, function(err, user){
		if(err){
			res.send(err);
		}
		else{
			res.json({message: 'User Updated', user: user});
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