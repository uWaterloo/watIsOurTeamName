angular.module('portalApp')

// Widget controller - runs every time widget is shown
.controller('watIsOurTeamNameCtrl', ['$scope', '$http', '$q', 'watIsOurTeamNameFactory', function ($scope, $http, $q, watIsOurTeamNameFactory) {

    // Widget Configuration
    $scope.portalHelpers.config = {
        // make 'widgetMenu.html' the template for the top right menu
        "widgetMenu": "widgetMenu.html"
    };

    // Import variables and functions from service
    $scope.data = watIsOurTeamNameFactory.data;
    // Model for the search and list example
    $scope.model = [{
        title: "item 1",
        details: "item 1 details",
        category: '1'
    }, {
        title: "item 2",
        details: "item 2 details",
        category: '2'
    }, {
        title: "item 3",
        details: "item 3 details",
        category: '1'
    }, {
        title: "item 4",
        details: "item 4 details",
        category: '2'
    }, {
        title: "item 5",
        details: "item 5 details",
        category: '1'
    }, {
        title: "item 6",
        details: "item 6 details",
        category: '2'
    }];

    // initialize the service
    watIsOurTeamNameFactory.init($scope);

	// Show main view in the first column
	$scope.portalHelpers.showView('main.html', 1);
    
    // watch for changes in the loading variable
    $scope.$watch('loading.value', function () {
        // if loading
        if ($scope.loading.value) {
            // show loading screen in the first column, and don't append it to browser history
            $scope.portalHelpers.showView('loading.html', 1, false);
            // show loading animation in place of menu button
            $scope.portalHelpers.toggleLoading(true);
        } else {
            $scope.portalHelpers.showView('main.html', 1);
            $scope.portalHelpers.toggleLoading(false);
        }
    });
	
}])
// Factory maintains the state of the widget
.factory('watIsOurTeamNameFactory', ['$http', '$rootScope', '$filter', '$q', function ($http, $rootScope, $filter, $q) {
		
	var initialized = {value: false};

	// Your variable declarations
	var data = {value: null};

	var init = function ($scope) {
		if (initialized.value)
			return;
		
		initialized.value = true;

		// Place your init code here:
		data.value={message:"Welcome to Waterloo's Classified Page"};
	}


	// Expose init(), and variables
	return {
		init: init,
		data: data
	};

}])
// Custom directive example
.directive('watIsOurTeamNameDirectiveName', ['$http', function ($http) {
	return {
		link: function (scope, el, attrs) {

		}
	};
}])
// Custom filter example
.filter('watIsOurTeamNameFilterName', function () {
	return function (input, arg1, arg2) {
		// Filter your output here by iterating over input elements
		var output = input;
		return output;
	}
});