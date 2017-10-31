'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TypesSchema = new Schema({
    _id : { 
        type: Object, 
        required: true,
        select: false
    },
    id : { 
        type: Object, 
        required: true
    },
    typeDesc : { 
        type: String, 
        required: true
    },
});

module.exports = mongoose.model('Types', TypesSchema);