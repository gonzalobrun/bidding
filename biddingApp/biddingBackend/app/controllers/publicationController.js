'use strict';
var mongoose = require('mongoose');
var Publication = require('../models/publication');
var PublicationModel = mongoose.model('Publications');

function createPub (req, res){

	var pub = new Publication();

	var owner = {};
	owner.id = req.body.ownerId;
	owner.username = req.body.username;

	var location = {};
	location.city = req.body.city;
	location.country = req.body.country;
	location.province = req.body.province;

	pub.owner = owner;
	pub.creationDate = new Date;
	pub.countdownStarted = false;
	pub.location = location;
	pub.type = req.body.type;
	pub.status = req.body.status
	pub.description = req.body.description;
	pub.title = req.body.title;
	pub.expirationDate = new Date(req.body.expirationDate);
	pub.expired = false;
	pub.minimunPrice = req.body.minimunPrice;
	pub.offerers.concat = [];
	pub.imgURL.concat = req.body.imgURL;
	pub.comments.concat = [];
	pub.categories.concat = req.body.categories;
	pub.likesCount = 0;

	pub.save(function(err, pub) {
		if(err){			
			return res.send(err);
		}
		else {
			res.json({message: 'Pub Created!', pub: pub});
		}
	});
}

function randomPub (req, res) {
	//res.send('Im the top 20 publications randomly');
	PublicationModel.find(function(err, pub){
		if(err) {
			res.send(err);
		}
		else{
			res.json({message: 'Random Pubs', pub: pub})
		}
	});

}

function getById (req, res) {
	//res.send('Im the pub ' + req.params.id + '!');

	PublicationModel.findById({_id: req.params.pubId}, function(err, pub){
		if(err) {
			res.send(err);
		}
		else{
			res.json({message: 'Single Pub by ID', pub: pub})
		}
	});
}

function getWithFilters (req, res) {
	res.send('show all the posts for the applied filters');
}

function logReq (req, res, next){
	console.log(req.method, req.url);
	next();
}

module.exports = {
	randomPub : randomPub,
	getById : getById,
	getWithFilters : getWithFilters,
	logReq : logReq,
	createPub : createPub
};