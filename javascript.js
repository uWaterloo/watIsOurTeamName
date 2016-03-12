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
    	$scope.item = {value:''};
    	$scope.dbData = watIsOurTeamNameFactory.dbData;
        // $scope.data = watIsOurTeamNameFactory.data;
        // Model for the search and list example
        $scope.model = [{
            title: "Fall 2016 Sublet",
            details: "BRIDGEPORT HOUSE - 328 Regina St. - 10 min bus ride to UW or 5 min walk to King&University Fully furnished, private ensuite bathroom, all utilities included including high speed internet + air conditioning!",
            price: "$495",
            category: '3'
        }, {
            title: "Math 135 Textbook For Sale!",
            details: "I am selling my Math 135 course notes. Good condition",
             price: "$10",
            category: '1'
        }, {
            title: "'96 Infiniti I30 237000km",
            details: "Car is currently driving daily. Just passed emission test last November and replaced a new exhaust pipe last year. No issue with engine at all. 4 season tires + aluminum rims 237000km",
            price: "$680",
            category: '1'
        }, {
            title: "Looking for a Physics Tutor",
            details: "I am looking for a physics tutor for phys 112. Willing to pay $20 per hour.",
             price: "$20",
            category: '2'
        }, {
            title: "Found Lost WatCard",
            details: "Found Lost Watcard. Name is John Smith.",
             price: "FREE",
            category: '4'
        }, {
            title: "Selling Size 10 Nike Shoes",
            details: "I am selling my Nike Shoes. Size 10.",
             price: "$20",
            category: '1'},
           {
            title: "Looking for Female Roommate for Winter 2015",
            details: "Looking for a Female roommate for Winter 2015",
                price: "N/A",
            category: '3'
        }
                       
                  ];

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
            // Show details view in the second column
            $scope.portalHelpers.showView('adDetails.html', 2);
        };
        //Create Table
        $scope.createTable = function () {
            $scope.portalHelpers.invokeServerFunction('createTable').then(function (
                result) {
                $scope.dbData.value = [];
                $scope.dbData.description = [];                
            });
        }
        // Handle form submit in the database test example
        $scope.insertData = function () {
            if ($scope.insertValue.value.length > 50)
                alert('value should be less than 50 characters');
            else {
                $scope.portalHelpers.invokeServerFunction('insert', {
                    value: $scope.insertValue.value
                }).then(function (result) {
                    $scope.dbData.value = result;
                });
                $scope.insertValue.value = "";
            }
        };        
        $scope.insertDescription = function () {
            if ($scope.insertDescription.description.length > 50)
                alert('description should be less than 500 characters');
            else {
                $scope.portalHelpers.invokeServerFunction('insert', {
                    description: $scope.insertDescription.description
                }).then(function (result) {
                    $scope.dbData.description = result;
                });
                $scope.insertDescription.description = "";
            }
        };  
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
            value: null
        };       
        var init = function($scope) {
            if (initialized.value)
                return;

            initialized.value = true;

            // Place your init code here:
            $scope.portalHelpers.invokeServerFunction('getData').then(function (result) {
                dbData.value = result;
                dbData.description = result;
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

