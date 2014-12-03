'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('organization').factory('Organization', ['$resource',
	function($resource) {
		return $resource('organization/:organizationId', {
			articleId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
