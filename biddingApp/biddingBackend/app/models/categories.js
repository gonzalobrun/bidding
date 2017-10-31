'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategoriesSchema = new Schema({
    _id : { 
        type: Object, 
        required: true, 
		select: false
    },
    id : { 
        type: Object, 
        required: true
    },
    categoryDesc : { 
        type: String, 
        required: true
    },
});

module.exports = mongoose.model('Categories', CategoriesSchema);