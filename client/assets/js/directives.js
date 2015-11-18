/**
 * Created by marco on 17/11/15.
 */
(function() {
    var app = angular.module("letsMooveDirectives", ["letsMooveController"]);
    app.directive("letsmooveHeader",function(){
        return {
            restrict : 'E',
            templateUrl : "/templates/header.html",
            controller : "loginController"
        };
    });

    app.directive("letsmooveFooter",function(){
        return {
            restrict : 'E',
            templateUrl : "/templates/footer.html"
        };
    });
})();