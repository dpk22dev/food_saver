'use strict';

var config = require('../../config/config');
var kue = require('kue');   /* adding kue */
var jobs = kue.createQueue();
kue.app.listen( config.kue_port );

exports.newEmail = function newEmail( iTitle, iTo, iTemplate ){
	console.log('newemail');
	var job = jobs.create('email', {
		title: iTitle,
		to: iTo,
		template: iTemplate
	}).save( function(err){
		if( !err ) console.log( 'job saved', job.id );
		else console.log('error in saving job');
	}).on('complete', function( result ){
		console.log('job completed with data', result );
	});
};

jobs.process('email', 10, function (job, done){
	console.log('process');
	console.log('to: ', job.data.to, ' title: ', job.data.title );
	console.log('Job', job.id, 'is done');

	if( job.id % 2 !== 0 ) {
		console.log('odd job id');
		return done( new Error('we are not even') );
	}else{
		console.log('even job id');
	}

	if( done )
	   done();
});