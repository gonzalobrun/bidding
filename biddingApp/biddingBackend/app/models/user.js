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
	email: String,
	phone: String,
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
	},
	notifications: [
        {
			message : String,
			read: Boolean,
			publicationId: String,
			userPhone: String,
			userEmail: String
        }
	],
	isAdmin: Boolean
});

module.exports = mongoose.model('Users', UserSchema);