'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PublicationSchema = new Schema({
	owner : String,
    creationDate : Date,
    countdownStarted : Boolean,
    location : String,
    type : Number,
    status : Number,
    description : String,
    title : String,
    imgURL : [],
    comments : [],
    category : [],
    likesCount : 0
});

module.exports = mongoose.model('Publication', PublicationSchema);