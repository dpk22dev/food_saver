'use strict';

/**
 * Module dependencies.
 */
// get the controllers which are required for this route
var users = require('../../app/controllers/users.server.controller'),
	organization = require('../../app/controllers/organization.server.controller');

module.exports = function(app) {
	// Article Routes
	app.route('/organization')
		.get(organization.list)
		.post(users.requiresLogin, organization.create);

	app.route('/organization/mqf/:mqf') 
		.post(users.requiresLogin, organization.hasAuthorization, organization.update);
};