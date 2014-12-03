'use strict';

var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	User = mongoose.model('User'),
	_ = require('lodash');

exports.create = function(req, res) {
};

exports.list = function(req, res) {
};

exports.hasAuthorization = function(req, res, next) {
	next(); // call the next function
};

exports.update = function(req, res) {

	User.findOne({ _id: req.user._id }, function (err, user) {
		user.minLifeSpan = req.body.mls;
		user.minQuatityFood = req.body.mqf;
		user.save(function(){
			console.log(user);
		});
	});
	
	return res.json(req.user);
};
