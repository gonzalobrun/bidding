var express = require('express');
var taxonomyRoutes = express.Router();
var taxonomy = require('../controllers/taxonomyController');

module.exports = function(app){
	
	taxonomyRoutes.get('/', [taxonomy.logReq, taxonomy.getTaxonomy]);
	
	app.use('/taxonomy', taxonomyRoutes);
}