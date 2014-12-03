'use strict';

// Configuring the Articles module
angular.module('organization').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Organization', 'organization', 'dropdown', '/organization(/create)?');
		Menus.addSubMenuItem('topbar', 'organization', 'List Organization', 'organization');
		Menus.addSubMenuItem('topbar', 'organization', 'New Organization', 'organization/create');
	}
]);