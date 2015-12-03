(function () {
    'use strict';

    var app = angular.module('application', [
        'ui.router',
        'ngAnimate',
        'ngMaterial',
        //specific app dependencies
        'letsMooveDirectives',
        'userControllers',
        'pathControllers',
        'uiGmapgoogle-maps',

        //foundation
        //'foundation',
        'foundation.dynamicRouting',
        'foundation.dynamicRouting.animations'
        ])
        .config(config)
        .run(run)
    ;

    config.$inject = ['$urlRouterProvider', '$locationProvider','uiGmapGoogleMapApiProvider'];

    function config($urlProvider, $locationProvider,uiGmapGoogleMapApiProvider) {
        $urlProvider.otherwise('/');

        $locationProvider.html5Mode({
            enabled: true
        });

        $locationProvider.hashPrefix('!');

        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyCGyfBFxoCCe2IOHSdhXrRRdTtsclma94Q',
            libraries: 'places'
        });
    }

    function run() {
        FastClick.attach(document.body);
    }

})();
