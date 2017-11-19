'use strict';
var mongoose = require('mongoose');
var Publication = require('../models/publication');
var PublicationModel = mongoose.model('Publications');

function createPub (req, res){

	var pub = new Publication();

	pub.owner.id = req.body.ownerId;
	pub.owner.username = req.body.ownerUsername;
	pub.creationDate = new Date;
	pub.countdownStarted = false;
	pub.location.country = req.body.country;
	pub.location.province = req.body.province;
	pub.location.city = req.body.city;
	pub.type = req.body.type;
	pub.status = req.body.status
	pub.description = req.body.description;
	pub.title = req.body.title;
	pub.expirationDate = new Date(req.body.expirationDate);
	pub.expired = false;
	pub.minimunPrice = req.body.minimunPrice;
	pub.offerers = [];
	pub.imgURL = req.body.imgURL.split(",");
	pub.comments = [];
	pub.categories = req.body.categories.split(",");
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
	//TODO: This should get 9 publications randomly, actually is being sorted randomly, and split it on the UI.
	PublicationModel.find(function(err, pub){
		if(err) {
			res.send(err);
		}
		else{
			res.json({message: 'Random Pubs', pubs: pub})
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
	// find each person with a last name matching 'Ghost'
	var queryObj = null;

	if(req.body.city === undefined){
		queryObj = { 
			'categories': { $in: req.body.categories.split(',') },
			'location.country': req.body.country,
			'location.province': req.body.province,
			'type': { $in: req.body.type.split(',') },
			'status': { $in: req.body.status.split(',') }
			}
	}	
	else {
		queryObj = {
			'categories': { $in: req.body.categories.split(',') },
			'location.country': req.body.country,
			'location.province': req.body.province,
			'location.city': req.body.city,
			'type': { $in: req.body.type.split(',') },
			'status': { $in: req.body.status.split(',') }
		}
	}
	
	var query = PublicationModel.find(queryObj);

	query.exec(function (err, pub) {
		if(err){
			res.send(err)
		}
		else {
			res.json({success: true, message:'Filters Applied', pubs: pub });
		}	
	})
}

function logReq (req, res, next){
	console.log(req.method, req.url);
	next();
}

function updatePub (req, res){	

	// var query = { _id: req.params.pubId },		
	// update = {
	// 	owner: {
	// 		id = req.body.ownerId,
	// 		username = req.body.ownerUsername,
	// 	},			
	// 	countdownStarted = req.params.countdownStarted,
	// 	location: {
	// 		country = req.body.country,
	// 		province = req.body.province,
	// 		city = req.body.city,
	// 	},			
	// 	type = req.body.type,
	// 	status = req.body.status,
	// 	description = req.body.description,
	// 	title = req.body.title,
	// 	expirationDate = req.body.expirationDate,
	// 	expired = false,
	// 	minimunPrice = req.body.minimunPrice,
	// 	offerers = req.params.offerers,
	// 	imgURL = req.body.imgURL.split(","),
	// 	comments = req.params.comments,
	// 	categories = req.body.categories.split(","),
	// 	likesCount = 0,
	// }

	// options = { multi: false };
	
	// UserModel.update(query, update, options, function(err, numAffected){
	// 	if(err){
	// 		res.send(err);
	// 	}
	// 	else{
	// 		if(numAffected.nModified === 1) {
	// 			res.json({success: true, message:'User updated', update: update });
	// 		}
	// 		else {
	// 			res.status(412).json({success: false, message:'The user couldn\'t be updated', update: null});
	// 		}			
	// 	}
	// });
};

function addComment (req, res){	

	var query = { _id: req.params.pubId };
	var comment = {
		username: req.body.username,
		commentText: req.body.comment
	}		

	PublicationModel.findByIdAndUpdate(
		query,
		{$push: {"comments": comment}},
		{safe: true, upsert: true, new : true},
		function(err, update) {
			if(err){
				res.send(err)
			}
			else {
				res.json({success: true, message:'Comment Added', update: update });
			}
			
		}
	);
};

function addOfferer (req, res){	
		
			var query = { _id: req.params.pubId };
			var offerer = {
				userId : req.body.userId,
				username : req.body.username,
				offerAmount : req.body.offerAmount
			  }		
	
			PublicationModel.findByIdAndUpdate(
				query,
				{$push: {"offerers": offerer}},
				{safe: true, upsert: true, new : true},
				function(err, update) {
					if(err){
						res.send(err)
					}
					else {
						res.json({success: true, message:'Offerer Added', update: update });
					}
					
				}
			);
		};


module.exports = {
	randomPub : randomPub,
	getById : getById,
	getWithFilters : getWithFilters,
	logReq : logReq,
	createPub : createPub,
	addComment : addComment,
	addOfferer: addOfferer,
	getWithFilters: getWithFilters
};