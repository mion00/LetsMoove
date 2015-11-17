/**
 * Created by marco on 17/11/15.
 */
(function() {
    var app = angular.module("letsMooveDirectives", ["letsMooveRouter"]);
    app.directive("letsmooveHeader",function(){
        return {
            restrict : 'E',
            templateUrl : "/static/partials/header.html",
            controller : "loginController"
        };
    });

    app.directive("letsmooveFooter",function(){
        return {
            restrict : 'E',
            templateUrl : "/static/partials/footer.html"
        };
    });
})();