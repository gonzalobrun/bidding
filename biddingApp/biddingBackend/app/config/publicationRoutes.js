var express = require('express');
var publicationRoutes = express.Router();
var publication = require('../controllers/publicationController');
var multer  = require('multer');
var upload = multer({ dest: 'upload/'});

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
	 
	publicationRoutes.post('/getWithFilters', [publication.logReq, publication.getWithFilters]);

	publicationRoutes.post('/getByUser', [publication.logReq, publication.getByUser]);

	publicationRoutes.get('/:pubId',[publication.logReq, publication.getById]);

	publicationRoutes.post('/addComment/:pubId', [publication.logReq, publication.addComment] );

	publicationRoutes.post('/addOfferer/:pubId', [publication.logReq, publication.addOfferer] );

	publicationRoutes.post('/setExpired', [publication.logReq, publication.setExpired]);

	publicationRoutes.post('/saveImg', upload.single('file'), [publication.logReq, publication.saveImg]);

	app.use('/pub', publicationRoutes);
}