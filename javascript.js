angular.module('portalApp')

// Widget controller - runs every time widget is shown
.controller('watIsOurTeamNameCtrl', ['$scope', '$http', '$q', 'watIsOurTeamNameFactory', function($scope, $http, $q, watIsOurTeamNameFactory) {

        // Widget Configuration
        $scope.portalHelpers.config = {
            // make 'widgetMenu.html' the template for the top right menu
            "widgetMenu": "widgetMenu.html"
        };

        // Import variables and functions from service
        $scope.loading = watIsOurTeamNameFactory.loading;
        $scope.insertValue = watIsOurTeamNameFactory.insertValue;
        $scope.insertDescription = watIsOurTeamNameFactory.insertDescription;
        $scope.insertContact = watIsOurTeamNameFactory.insertContact;
        $scope.insertCategory = watIsOurTeamNameFactory.insertCategory;
        $scope.insertStatus = watIsOurTeamNameFactory.insertStatus;
        $scope.item = {
            value: ''
        };
        $scope.dbData = watIsOurTeamNameFactory.dbData;
        // $scope.data = watIsOurTeamNameFactory.data;
        // Model for the search and list example
        $scope.append = function(){
            // $scope.model.push({{item.value}});
            
        };
    
    	$scope.portalHelpers.invokeServerFunction('getData').then(
    	function(result){
    	$scope.model = result;
            console.log(result);
    	}
    	);

        // initialize the service
        watIsOurTeamNameFactory.init($scope);

        // Show main view in the first column
        $scope.portalHelpers.showView('main.html', 1);

        // watch for changes in the loading variable
        $scope.$watch('loading.value', function() {
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

        // Handle click on an item in the list and search example
        $scope.showDetails = function(item) {
            // Set which item to show in the details view
            $scope.item.value = item;
            // Show details view in the second column
            $scope.portalHelpers.showView('details.html', 2);
        };

        // Handle "previous item" click from the details page
        $scope.prevItem = function() {
            // get previous items in the list
            var prevItem = $scope.portalHelpers.getPrevListItem();
            // refresh details view with the new item
            $scope.showDetails(prevItem);
        }

        $scope.nextItem = function() {
                var nextItem = $scope.portalHelpers.getNextListItem();
                $scope.showDetails(nextItem);
            }
            // Post Ad stuff
        $scope.showPostAd = function(item) {
            // Set which item to show in the showAdDetails view
            $scope.item.value = item;
            $scope.item.description = item;
            $scope.item.contact = item;
            $scope.item.category = item;
            $scope.item.status = item;

            // Show details view in the second column
            $scope.portalHelpers.showView('adDetails.html', 2);
        };
        //Create Table
        $scope.createTable = function() {
                $scope.portalHelpers.invokeServerFunction('createTable').then(function(
                    result) {
                    $scope.dbData.value = [];
                    $scope.dbData.description = [];
                    $scope.dbData.contact = [];
                    $scope.dbData.category = [];
                    $scope.dbData.status = [];
                });
            }
            // Handle form submit in the database test example
        $scope.insertData = function() {
            //title
            $scope.model.push({
                value: $scope.insertValue.value,
                description: $scope.insertDescription.description,
                contact: $scope.insertContact.contact,
                category: $scope.insertCategory.category,
                status: $scope.insertStatus.status
            });
            $scope.portalHelpers.invokeServerFunction('insert', {
                value: $scope.insertValue.value,
                description: $scope.insertDescription.description,
                contact: $scope.insertContact.contact,
                category: $scope.insertCategory.category,
                status: $scope.insertStatus.status
            }).then(function(result) {
                // $scope.dbData.value = result;
                // $scope.dbData.description = result;
                // $scope.dbData.contact = result;
                // $scope.dbData.category = result;
                // $scope.dbData.status = result;
            });
        }
    }])
    // Factory maintains the state of the widget
    .factory('watIsOurTeamNameFactory', ['$http', '$rootScope', '$filter', '$q', function($http, $rootScope, $filter, $q) {

        var initialized = {
            value: false
        };
        // Your variable declarations
        var loading = {
            value: true
        };
        var sourcesLoaded = 0;

        // Your variable declarations
        var data = {
            value: null
        };
        var dbData = {
            value: null
        };
        var insertValue = {
            value: null
        };
        var insertDescription = {
            description: null
        };
        var insertContact = {
            contact: null
        };
        var insertCategory= {
            category: null
        };
        var insertStatus = {
            status: null
        };
        var init = function($scope) {
            if (initialized.value)
                return;

            initialized.value = true;

            // Place your init code here:
            $scope.portalHelpers.invokeServerFunction('getData').then(function(result) {
                dbData.value = result;
                dbData.description = result;
				dbData.contact = result;
				dbData.category = result;
				dbData.status = result;
            });
            data.value = {
                message: "Welcome to Waterloo's Classified Page"
            };
            sourceLoaded();
        }

        function sourceLoaded() {
            sourcesLoaded++;
            if (sourcesLoaded > 0)
                loading.value = false;
        }


        // Expose init(), and variables
        return {
            init: init,
            data: data,
            loading: loading,
            insertValue: insertValue,
            insertDescription: insertDescription,
			insertContact: insertContact,
			insertCategory: insertCategory,
			insertStatus: insertStatus,
            dbData: dbData
        };

    }])
    // Custom directive example
    .directive('watIsOurTeamNameDirectiveName', ['$http', function($http) {
        return {
            link: function(scope, el, attrs) {

            }
        };
    }])
    // Custom filter example
    .filter('watIsOurTeamNameFilterName', function() {
        return function(input, arg1, arg2) {
            // Filter your output here by iterating over input elements
            var output = input;
            return output;
        }
    });