'use strict';

// put info for development env here

module.exports = {
	db: 'mongodb://localhost/mean-dev',
	kue_port: 3001,
	app: {
		title: 'MEAN.JS - Development Environment'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || '670139643102019',
		clientSecret: process.env.FACEBOOK_SECRET || '17c08b072ca0f6114dd9085e3d02bc1d',
		callbackURL: '/auth/facebook/callback'
                // tried 'http://www.mycoolwebsite.com/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || '28HxpqMts8R2KhnDvSAPGVoXx',
		clientSecret: process.env.TWITTER_SECRET || 'm7OfK3fRgSnWAc2E6dWUfhqZTNDG75HrXG2peVV23KrDCUZp7K',
		callbackURL: '/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || '399258940162-e16e4056jequ1con3lfd0k54gsqhb98p.apps.googleusercontent.com',
		clientSecret: process.env.GOOGLE_SECRET || 'rIKQEkUAszoD49FtqAoTVosm',
		callbackURL: '/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || 'APP_ID',
		clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
		callbackURL: '/auth/linkedin/callback'
	},
	github: {
		clientID: process.env.GITHUB_ID || 'APP_ID',
		clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
		callbackURL: '/auth/github/callback'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
			}
		}
	}
};