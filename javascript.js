angular.module('portalApp')

// Widget controller - runs every time widget is shown
.controller('sampleFavouriteServiceCtrl', ['$scope', '$http', '$q', 'favouritesService', 'sampleFavouriteServiceFactory', function ($scope, $http, $q, favouritesService, sampleFavouriteServiceFactory) {

    // Make favourite service available from the scope so we can call service.toggle function from the view directly
    $scope.favService = favouritesService;
    $scope.data = {value:null};

    // initialize the service
    sampleFavouriteServiceFactory.init($scope);

	// Show main view in the first column
	$scope.portalHelpers.showView('main.html', 1);
    
    // Import variables and functions from service
    $scope.data.value = sampleFavouriteServiceFactory.data;
    
    // This will cause the service to start pulling in favourites for this widget
    // As well as configure the service to be specific to this widget
    // the 'title' indicates the key for the value that will be saved
    favouritesService.register('sampleFavouriteService', $scope.data, 'title');
    // The sync function compares our supplied data to the database
    // See the synced output for $$fav: true on saved entries.
	favouritesService.sync().then(function () {
        			console.log("Data synced:", $scope.data);
                });
    
    // Handle click on the checkbox
    $scope.toggleFav = function (val) {
        // toggle(val) function will save or delete the entry from the database
        $scope.favService.toggle(val);
    }
}])
// Factory maintains the state of the widget
.factory('sampleFavouriteServiceFactory', ['$http', '$rootScope', '$filter', '$q', function ($http, $rootScope, $filter, $q) {
		
	var initialized = {value: false};

	// Sample data
	var data = [
        {title: "Apple", id: 1, rating: 5},
        {title: "Pear", id: 2, rating: 1},
        {title: "Peach", id: 3, rating: 3}
        ];

	var init = function ($scope) {
		if (initialized.value)
			return;
        
		initialized.value = true;
	}


	// Expose init(), and variables
	return {
		init: init,
		data: data
	};

}]);