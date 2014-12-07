'use strict';

/**
 * Module dependencies.
 */
/*
 * 
 * we can use controller in our controller like errorHandler
 * we will use model for data
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	assign = require('./assign.server.controller'),
	Donation = mongoose.model('Donation'),	
	_ = require('lodash');

var testMail = require('../jobs/kue.server');

/**
 * Create a donation entry
 */
exports.create = function(req, res) {
	var donation = new Donation(req.body);
	donation.user = req.user;

	donation.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			// create document in assign collection
			assign.create_donation( req.user.id, donation.id );			
			res.json(donation);
		}
	}); 
};

/**
 * Show the current donation
 */
exports.read = function(req, res) {
	res.json(req.donation);
};

/**
 * Update a donation
 */
exports.update = function(req, res) {
	var donation = req.donation;

	donation = _.extend(donation, req.body);

	donation.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(donation);
		}
	});
};

/**
 * Delete a donation
 */
exports.delete = function(req, res) {
	var donation = req.donation;

	donation.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			testMail.newEmail( 'title', 'to', 'template' );
			res.json(donation);
		}
	});
};

/**
 * List of Donation
 */
exports.list = function(req, res) {
	Donation.find().sort('-created').populate('user', 'displayName').exec(function(err, donation) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(donation);
		}
	});
};

/**
 * Donation middleware
 */
exports.donationByID = function(req, res, next, id) {
	Donation.findById(id).populate('user', 'displayName').exec(function(err, donation) {
		if (err) return next(err); // we are calling next with error code
		if (!donation) return next(new Error('Failed to load donation ' + id));
		req.donation = donation;
		next(); // notice the next, as we know it won't be last function, user needs to do something after getting donationId
	});
};

/**
 * Donation authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.donation.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next(); // call the next function
};