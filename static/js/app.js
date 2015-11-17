/**
 * Created by marco on 17/11/15.
 */
(function() {
    var app = angular.module("letsMoove", ["letsMooveDirectives",'ui.router']);
    app.config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
        $stateProvider
            .state('staticHome', {
                url: '/home',
                templateUrl: '/static/partials/staticHome.html'
            }).state('signup', {
                url: '/signup',
                templateUrl: '/static/partials/signup.html'
            });

    });
})();