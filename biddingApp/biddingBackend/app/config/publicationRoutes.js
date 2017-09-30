var express = require('express');
var publicationRouter = express.Router();
var publication = require('../controllers/publicationController');

publicationRoutes.param('id', function(req, res, next, password){

	console.log('Doing Validations on ' + password);
	req.password = password;

	next();
}); 

publicationRoutes.param('filters', function(req, res, next, filters){

	console.log('Doing Validations on ' + filters);
	req.filters = filters;

	next();
});

module.exports = function(app) {

 	publicationRoutes.get('/random', [publication.logReq, publication.randomPub]);

	publicationRoutes.get('/:pub',[publication.logReq, publication.getById]);

	publicationRoutes.get('/filter/:filters', [publication.logReq, publication.getWithFilters]);

	app.use('/pub', publicationRoutes);
}