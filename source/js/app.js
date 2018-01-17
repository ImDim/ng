'use strict';

phoneStoreApp = angular.module('phoneStoreApp', ['ngRoute', 'ngResource'])

.config(['$routeProvider', '$locationProvider', function($routeProvide, $locationProvide) {

    $routeProvide
        .when('/', {

            templateUrl: 'ng-templates/home.html',
            controller: 'MainStoreCtrl'

        })
        .when('/phones/:phoneId', {
            templateUrl:'ng-templates/product_details.html',
            controller:'ProductDetailsCtrl'
        })
        .when('/about', {

            templateUrl: 'ng-templates/about.html',
            controller: 'AboutSkillCtrl'

        })
        .otherwise({

            redirectTo: '/'

        });

        $locationProvide.html5Mode(true);

}])

/* Factory */
.factory('Phone', [

    '$resource', function($resource) {

      return $resource('/assets/phones/:phoneId.:format', {
        phoneId: 'phones',
        format: 'json',
      });

    }
])

.filter('instock', function() {

    return function(input) {

        return input == 'true' ? 'fa-apple' : 'fa-smile-o'; 

    }

})

.filter('checkmark', function() {
    return function(input) {
      return input ? '\u2713' : '\u2718';
    }
})

.controller('AboutSkillCtrl', ['$scope',

    function($scope) {

        $scope.message = 'About Page';

    }

])

.controller('MainStoreCtrl', ['$scope', '$http',

    function($scope, $http) {

        $scope.search_query= '',
            $scope.orderReverse = false,
            $scope.orderVal = 'name';

        $scope.orderList = {

            "name": {"id": "name", "name": "По имени"},
            "price": {"id": "price", "name": "По цене"},
            "status": {"id": "status", "name": "В наличии"}

        };

        $(".navigation__item[data-nav-target='home']").addClass("navigation__item_active");

        $scope.orderName = $scope.orderList[$scope.orderVal].name;

        $http.get('assets/phones/phones.json').then(function(response) {

            $scope.phoneList = response.data;

        });

        $scope.setOrderBy = function(orderVal) {

            $scope.orderVal == orderVal ? $scope.orderReverse = !$scope.orderReverse : $scope.orderReverse = false;

            $scope.orderVal = orderVal;
            $scope.orderName = $scope.orderList[$scope.orderVal].name;

        }

    }

])

.controller('ProductDetailsCtrl', ['$scope','$http', '$location', '$routeParams', 'Phone',

    function($scope, $http, $location, $routeParams, Phone) {

        $scope.phoneId = $routeParams.phoneId;

        $(".navigation__item_active").removeClass("navigation__item_active");

        Phone.get({phoneId: $routeParams.phoneId}, function(data) {
        
          $scope.phone = data;
          $scope.mainImageUrl = data.images[0];

        });
    
        $scope.setImage = function(imageUrl) {
          $scope.mainImageUrl = imageUrl;
        }    

    }

]);