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
        $scope.insertForSale = watIsOurTeamNameFactory.insertForSale;
        $scope.insertTutoring = watIsOurTeamNameFactory.insertTutoring;
        $scope.insertHousing = watIsOurTeamNameFactory.insertHousing;
        $scope.insertLostFound = watIsOurTeamNameFactory.insertLostFound;
        $scope.insertStatus = watIsOurTeamNameFactory.insertStatus;
        $scope.item = {
            value: ''
        };
        $scope.dbData = watIsOurTeamNameFactory.dbData;
        // $scope.data = watIsOurTeamNameFactory.data;
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
            $scope.item.forSale = item;
            $scope.item.tutoring = item;
            $scope.item.housing = item;
            $scope.item.lostFound = item;
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
                    $scope.dbData.forSale = [];
                    $scope.dbData.tutoring = [];
                    $scope.dbData.housing = [];
                    $scope.dbData.lostFound = [];
                    $scope.dbData.status = [];
                });
            }
            // Handle form submit in the database test example
        $scope.insertData = function() {
            //title
            $scope.portalHelpers.invokeServerFunction('insert', {
                value: $scope.insertValue.value,
                description: $scope.insert.description,
                contact: $scope.insertContact.contact,
                forSale: $scope.insertForSale.forSale,
                tutoring: $scope.insertTutoring.tutoring,
                housing: $scope.insertHousing.housing,
                lostFound: $scope.insertLostFound.lostFound,
                status: $scope.insertStatus.status

            }).then(function(result) {
                $scope.dbData.value = result;
                $scope.dbData.description = result;
                $scope.insertContact.contact = result;
                $scope.insertForSale.forSale = result;
                $scope.insertTutoring.tutoring = result;
                $scope.insertHousing.housing = result;
                $scope.insertLostFound.lostFound = result;
                $scope.insertStatus.status = result;
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
        var insertForSale = {
            forSale: null
        };
        var insertTutoring= {
            tutoring: null
        };
        var insertHousing = {
            housing: null
        };
        var insertLostFound = {
            lostFound: null
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
				insertContact.contact = result;
				insertForSale.forSale = result;
				insertTutoring.tutoring = result;
				insertHousing.housing = result;
				insertLostFound.lostFound = result;
				insertStatus.status = result;
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
			insertContact.contact: insertContact,
			insertForSale.forSale: insertForSale,
			insertTutoring.tutoring: insertTutoring,
			insertHousing.housing: insertHousing,
			insertLostFound.lostFound: insertLostFound,
			insertStatus.status: insertStatus,
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