var express = require('express');
var publicationRoutes = express.Router();
var publication = require('../controllers/publicationController');

//MIDDLEWARES
publicationRoutes.param('id', function(req, res, next, password){

	console.log('Doing Validations on ' + password);
	req.password = password;

	next();
}); 

publicationRoutes.param('filter', function(req, res, next, filters){

	console.log('Doing Validations on ' + filters);
	req.filters = filters;

	next();
});

module.exports = function(app) {

	publicationRoutes.post('/', [publication.logReq, publication.createPub])

 	publicationRoutes.get('/random', [publication.logReq, publication.randomPub]);

	publicationRoutes.get('/:pubId',[publication.logReq, publication.getById]);

	publicationRoutes.post('/filter', [publication.logReq, publication.getWithFilters]);

	app.use('/pub', publicationRoutes);
}