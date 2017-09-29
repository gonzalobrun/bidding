var publication = require('../models/publication');

function randomPub (req, res) {
	//req.query.nombre;
	res.send('Im the top 20 publications randomly');
}

function getById (req, res) {
	res.send('Im the pub ' + req.params.id + '!');
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
	logReq : logReq
};