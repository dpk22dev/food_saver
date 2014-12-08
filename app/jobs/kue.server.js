'use strict';

var config = require('../../config/config');
var kue = require('kue');   /* adding kue */
var CircularJSON = require('circular-json');
var fs = require('fs');


var jobs = kue.createQueue();
kue.app.listen( config.kue_port );

exports.newEmail = function newEmail( iTitle, iTo, iTemplate, iReq, iRes, iDonation ){
	console.log('newemail', iRes );
	var job = jobs.create('email', {
		title: iTitle,
		to: iTo,
		template: iTemplate,
		// req: iReq //causes error in saving job
		// maybe use json.strigify to save object
		// should we be using bson instead of json object
		req: CircularJSON.stringify( iReq ),
		res: CircularJSON.stringify( iRes ),
		donation: CircularJSON.stringify( iDonation )
	}).save( function(err){
		if( !err ) console.log( 'job saved', job.id );
		else console.log('error in saving job');
	}).on('complete', function( result ){				
		console.log('job completed with data', result );
		//CircularJSON.parse(serialized);		
		var res = CircularJSON.parse( job.data.res );
		var donation = CircularJSON.parse( job.data.donation );
		var req = CircularJSON.parse( job.data.req );

var wstream = fs.createWriteStream('/tmp/test2');
wstream.write( 'after circular-json parse req:' ); 	
wstream.write( req ); 	
wstream.write( 'after circular-json parse res:' ); 	
wstream.write( res ); 	
wstream.write( 'after circular-json parse donation' ); 	
wstream.write( donation ); 	
wstream.end();
	
		// gives error that res has no method 'json'
		// i think its a bad idea to return result here, 
		res.json( donation );
		//we should return result corresponding to a request; we can't allow client
		// hanging too late for result
		// but if we send result earlier we may need socket.io to send back notification
		//now
	});
};

jobs.process('email', 10, function (job, done){
	console.log('process');
	console.log('to: ', job.data.to, ' title: ', job.data.title );
	console.log('Job', job.id, 'is done');
/*
	if( job.id % 2 !== 0 ) {
		console.log('odd job id');
		return done( new Error('we are not even') );
	}else{
		console.log('even job id');
	}
*/
	if( done )
	   done();
});