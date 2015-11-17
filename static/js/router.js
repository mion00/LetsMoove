/**
 * Created by marco on 17/11/15.
 */
(function() {
    var app = angular.module("letsMooveRouter", ['ui.router','authentication']);
    app.controller("loginController",["$scope","$state","AuthenticationService",function($scope,$state,AuthenticationService){
        $scope.username=AuthenticationService.getUsername();
        $scope.password="";
        $scope.isLoggedIn = false;
        $scope.login = function () {
            var callback = function(result){
                $scope.$parent.isLoggedIn = result;
                if(result){
                    $state.transitionTo("privateHome");
                }
            };

            AuthenticationService.Login($scope.username,$scope.password,callback);
        };

        $scope.logout = function() {
            $scope.isLoggedIn = false;
            $state.transitionTo("staticHome");
            AuthenticationService.clear();
        };
    }]);
    app.config(["$stateProvider", "$urlRouterProvider","$locationProvider",function($stateProvider, $urlRouterProvider,$locationProvider) {
        $urlRouterProvider.otherwise('/home');
        $locationProvider.html5Mode(true).hashPrefix("!");
        $stateProvider
            .state('staticHome', {
                url: '/',
                templateUrl: '/static/partials/staticHome.html',
                authenticate: false
            }).state('signup', {
                url: '/signup',
                templateUrl: '/static/partials/signup.html',
                authenticate: false
            }).state('login', {
                url: '/login',
                templateUrl: '/static/partials/login.html',
                authenticate: false,
                controller: 'loginController'
            }).state('privateHome', {
                url: '/user',
                templateUrl: '/static/partials/userHome.html',
                authenticate: true,
                controller: 'loginController'
            });

    }]);

})();