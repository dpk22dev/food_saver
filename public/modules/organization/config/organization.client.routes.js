'use strict';

// Setting up route
angular.module('organization').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('listOrganization', {
			url: '/organization',
			templateUrl: 'modules/organization/views/list-articles.client.view.html'
		}).
		state('createOrganization', {
			url: '/organization/create',
			templateUrl: 'modules/organization/views/create-article.client.view.html'
		}).
		state('viewOrganization', {
			url: '/organization/:organizationId',
			templateUrl: 'modules/organization/views/view-article.client.view.html'
		}).
		state('editOrganization', {
			url: '/organization/:organizationId/edit',
			templateUrl: 'modules/organization/views/edit-article.client.view.html'
		});
	}
]);