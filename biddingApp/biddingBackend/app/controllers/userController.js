'use strict'
var mongoose = require('mongoose');
var User = require('../models/user');
var UserModel = mongoose.model('Users');

function getUsers(req, res) {

	UserModel.find(function(err, user){
		
		if(err) {
			res.send(err);
		}
		else{
			res.json({message: 'All Users', users: user})
		}

	});
}

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
		if(req.body.password === undefined){
			delete update.password;
		}

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

function checkNotifications(req, res){
	UserModel.findById({_id : req.params._id}, function(err, user){
		if(err){
			res.send(err);
		}
		else{
			res.json({success: true, message:'User\'s notifications', notifications: user.notifications });					
		}
	})
};

function setAsRead(req, res) {

	// var parsedUserId = ObjectId.fromString( req.body.userId.toString() );
	// var parsedNotifId = ObjectId.fromString( req.body.notificationId.toString());

	// console.log('USER:    --->' + parsedUserId);
	// console.log('NOTIF:    --->' + parsedNotifId);

	var query = { _id: req.body.userId, 'notifications._id': req.body.notificationId },
	update = {'$set': {	'notifications.$.read': true }},
	options = { multi: false,  new : true };

	UserModel.update(query, update, options, function(err, numAffected){
		if(err){
			res.send(err);
		}
		else{
			if(numAffected.nModified === 1) {
				res.json({success: true, message:'Notification set as read succesfully', update: update });
			}
			else {
				console.log(numAffected.nModified);
				res.status(412).json({success: false, message:'The notification couldn\'t be set as read', update: null});
			}			
		}
	});
}

module.exports = {
	createUser : createUser,
	logUser : logUser,
	updateUser : updateUser,
	deleteUser : deleteUser,
	logReq: logReq,
	checkNotifications: checkNotifications,
	setAsRead: setAsRead,
	getUsers: getUsers
};