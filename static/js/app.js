/**
 * Created by marco on 17/11/15.
 */
(function() {
    var app = angular.module("letsMoove", ["letsMooveDirectives",'ui.router']);
    app.config(function($stateProvider, $urlRouterProvider,$locationProvider) {
        $urlRouterProvider.otherwise('/home');
        $locationProvider.html5Mode(true).hashPrefix("!");
        $stateProvider
            .state('staticHome', {
                url: '/',
                templateUrl: '/static/partials/staticHome.html'
            }).state('signup', {
                url: '/signup',
                templateUrl: '/static/partials/signup.html'
            });

    });
})();