'use strict';
/**
 * Module dependencies.
 */

// load the config files
var init = require('./config/init')(),
	config = require('./config/config'),
	mongoose = require('mongoose'),
	chalk = require('chalk');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Bootstrap db connection
// development.js/production.js/test.js has db field which gets in config.js
var db = mongoose.connect(config.db, function(err) {
	if (err) {
		console.error(chalk.red('Could not connect to MongoDB!')); // write with different fonts and background on terminal
		console.log(chalk.red(err));
	}
});
/*
 *  we could use 
 *  db.on('error', console.error);
    db.once('open', function() {
        // Create your schemas and models here.
    });
 */
// Init the express application
var app = require('./config/express')(db);

// Bootstrap passport config
require('./config/passport')();

// Start the app by listening on <port>
// config is got from loading config/ directory
app.listen(config.port);

// Expose app
exports = module.exports = app;

// Logging initialization
console.log('MEAN.JS application started on port ' + config.port);


