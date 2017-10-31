'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StatusSchema = new Schema({
    _id : { 
        type: Object, 
        required: true,
        select: false
    },
    id : { 
        type: Object, 
        required: true
    },
    ststusDesc : { 
        type: String, 
        required: true
    },
});

module.exports = mongoose.model('Status', StatusSchema);