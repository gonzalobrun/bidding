'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PublicationSchema = new Schema({
	owner : { 
        type: Object, 
        required: true
    },
    creationDate : { 
        type: Date, 
        required: true
    },
    countdownStarted : Boolean,
    location : { 
        type: Object, 
        required: true
    },
    type : { 
        type: Number, 
        required: true
    },
    status : { 
        type: Number, 
        required: true
    },
    description : { 
        type: String, 
        required: true
    },
    title : { 
        type: String, 
        required: true
    },
    expirationDate: { 
        type: Date, 
        required: true
    },
    expired: Boolean,
    minimunPrice: Number,
    offerers: [],
    imgURL : [String],
    comments : [],
    categories : [],
    likesCount : Number
});

module.exports = mongoose.model('Publications', PublicationSchema);