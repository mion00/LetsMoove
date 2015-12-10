/**
 * Created by marco on 17/11/15.
 */
(function () {

    var app=angular.module('userServices',["ngResource"]);
    app.factory('AuthenticationService', ['$http',function($http) {
        var service = {};
        service.userData = {
            username : "",
            loggedIn : false
            };

        service.Login = function(username, password, callback) {

            //ToDo Codice mockup in attesa di implementare l'interfaccia col Database
            if(username == "test" && password == "test") {
                service.userData.loggedIn = true;
                service.userData.username = username;
                callback(true);
            }else{
                service.userData.loggedIn = false;
                callback(false)
            }

            //$http.post('/api/authenticate', { username: username, password: password })
            //    .success(function (response) {
            //        callback(response);
            //    });

        };

        service.logout = function () {
            service.userData.username = "";
            service.userData.loggedIn = false;
        }

        return service;
    }]);

    app.factory('User', ['$resource',function ($resource, apiURL) {
            return $resource("/api/teams/:teamId", {}, {
                query: {method: 'GET'}
            });
        }]);

    app.run(function ($rootScope, $state, AuthenticationService) {
            $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
                if (toState.data.vars.authenticate && !AuthenticationService.userData.loggedIn){
                    // User isn’t authenticated
                    $state.transitionTo("login");
                    event.preventDefault();
                }
            });
        });

})();