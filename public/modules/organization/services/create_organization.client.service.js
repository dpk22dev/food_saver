'use strict';

angular.module('organization').factory('createOrganization', ['$resource',
	function($resource) {
		return $resource('organization/mqf/:mqf/', {
			mqf:'1'
		}, {
			update: {
				method: 'POST'
			}
		});
	}
]);


