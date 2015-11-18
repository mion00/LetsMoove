/**
 * Created by marco on 17/11/15.
 */
(function() {
    var app = angular.module("letsMooveController", ['ui.router','authentication']);
    app.controller("loginController",["$scope","$state","AuthenticationService",function($scope,$state,AuthenticationService){
        $scope.username=AuthenticationService.getUsername();
        $scope.password="";
        $scope.isLoggedIn = false;
        $scope.login = function () {
            var callback = function(result){
                $scope.$parent.isLoggedIn = result;
                if(result){
                    $state.transitionTo("userHome");
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
})();