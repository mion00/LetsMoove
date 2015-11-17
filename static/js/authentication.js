/**
 * Created by marco on 17/11/15.
 */
(function () {

    var app=angular.module('authentication',[]);
    app.factory('AuthenticationService', ['$http',function($http) {
        var service = {};
        service.username="";
        service.Login = function Login(username, password, callback) {
            service.isLoggedIn = true;
            service.username = username;
            callback(true);

            //$http.post('/api/authenticate', { username: username, password: password })
            //    .success(function (response) {
            //        callback(response);
            //    });

        };
        service.isLoggedIn = false;
        service.getUsername = function () {
            return service.username;
        };

        service.clear = function () {
            service.username = "";
        }

        return service;
    }]);

    app.run(function ($rootScope, $state, AuthenticationService) {
            $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
                if (toState.authenticate && !AuthenticationService.isLoggedIn){
                    // User isn’t authenticated
                    $state.transitionTo("login");
                    event.preventDefault();
                }
            });
        });

})();