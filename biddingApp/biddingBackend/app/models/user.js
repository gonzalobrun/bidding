'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: String,
	username: { 
		type: String, 
		required: true, 
		index: {
			unique: true
		}
	},
	password: { 
		type: String, 
		required: true, 
		select: false
	},
	country: { 
		type: String, 
		required: true
	},
	province: { 
		type: String,
		required: true
	},
	city: { 
		type: String, 
		required: true
	}
});

module.exports = mongoose.model('User', UserSchema);