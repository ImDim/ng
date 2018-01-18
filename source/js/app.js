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
            controller: 'AboutStoreCtrl'

        })
        .when('/contacts', {

            templateUrl: 'ng-templates/contacts.html',
            controller: 'ContactsStoreCtrl'

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

.factory('SetNavClass', [

    '$resource', function($resource) {

        return function(dir) {

            if( !dir ) var dir = 'home';

            $(".navigation__item_active").removeClass("navigation__item_active");
            $(".navigation__item[data-nav-target='"+dir+"']").addClass("navigation__item_active");

        }

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

.controller('MainStoreCtrl', ['$scope', '$http', 'SetNavClass',

    function($scope, $http, SetNavClass) {

        $scope.search_query= '',
            $scope.orderReverse = false,
            $scope.orderVal = 'name';

        $scope.orderList = {

            "name": {"id": "name", "name": "По имени"},
            "price": {"id": "price", "name": "По цене"},
            "status": {"id": "status", "name": "В наличии"}

        };

        SetNavClass('home');

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

.controller('AboutStoreCtrl', ['$scope', '$http', 'SetNavClass',

    function($scope, $http, SetNavClass) {


        SetNavClass('about');

    }

])

.controller('ContactsStoreCtrl', ['$scope', '$http', 'SetNavClass',

    function($scope, $http, SetNavClass) {


        SetNavClass('contacts');

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