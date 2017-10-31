'use strict';
var mongoose = require('mongoose');

var Categories = require('../models/categories');
var CategoriesModel = mongoose.model('Categories');
var Status = require('../models/status');
var StatusModel = mongoose.model('Status');
var Types = require('../models/types');
var TypesModels = mongoose.model('Types');
var Locations = require('../models/locations');
var LocationsModels = mongoose.model('Locations');


function getTaxonomy (req, res) {
    
    CategoriesModel.find(function(err, cat){
        if(err) {
            res.send(err);
        }
        else{
            StatusModel.find(function(err, stat){
                if(err) {
                    res.send(err);
                }
                else{
                    TypesModels.find(function(err, types){
                        if(err) {
                            res.send(err);
                        }
                        else{

                            LocationsModels.find(function(err, loc){
                                if(err) {
                                    res.send(err);
                                }
                                else {
                                    res.json({success: true, message: 'Taxonomy', data: {categories: cat, types: types, status: stat, locations: loc}})
                                }
                            })
                            
                        } 
                    });;
                } 
            });
        }        
    });
}

function logReq (req, res, next){
	console.log(req.method, req.url);
	next();
}

module.exports = {
	getTaxonomy: getTaxonomy,
	logReq : logReq
};