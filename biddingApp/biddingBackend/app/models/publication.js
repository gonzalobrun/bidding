'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PublicationSchema = new Schema({
	owner : { 
        id: { type: String, required: true },
        username: { type: String, required: true }
    },
    creationDate : { 
        type: Date, 
        required: true
    },
    countdownStarted : Boolean,
    location : { 
        country: {type: String, required: true},
        province: {type: String, required: true},
        city: {type: String, required: true}
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
    offerers: [
        {
            userId : String,
            username : String,
            offerAmount : Number
        }
    ],
    imgURL : [String],
    comments : [
        {
            username: String,
            commentText: String
        }
    ],
    categories : [],
    likesCount : Number,
    winner: {
        id: String,
        username: String
    }
});

module.exports = mongoose.model('Publications', PublicationSchema);