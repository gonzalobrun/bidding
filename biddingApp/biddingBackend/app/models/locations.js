'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationsSchema = new Schema({
    _id : { 
        type: Object, 
        required: true, 
		select: false
    },
    id : { 
        type: Object, 
        required: true
    },
    capital: String,
    ciudades: Array
});

module.exports = mongoose.model('Locations', LocationsSchema);