/**
 * Created by marco on 17/11/15.
 */
(function() {
    var app = angular.module("userControllers", ['ui.router','userServices']);
    app.controller("loginController",["$state","AuthenticationService",function($state,AuthenticationService){
        this.doLogin = function () {
            var callback = function(result){
                //console.log(result);
                if(result){
                    $state.transitionTo("userHome");
                }
            };

            AuthenticationService.Login(this.username,this.password,callback);
        };
    }]);

    app.controller("userDataController",["AuthenticationService",function(AuthenticationService){
        this.userData = AuthenticationService.userData;
    }]);

    app.controller("logoutController",["$state","AuthenticationService",function($state,AuthenticationService){
        this.userData = AuthenticationService.userData;
        this.logout = function() {
            AuthenticationService.logout();
            $state.transitionTo("staticHome");
        };
    }]);
})();