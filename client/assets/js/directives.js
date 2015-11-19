/**
 * Created by marco on 17/11/15.
 */
(function() {
    var app = angular.module("letsMooveDirectives", []);
    app.directive("letsmooveHeader",function(){
        return {
            restrict : 'E',
            templateUrl : "/templates/header.html",
        };
    });

    app.directive("letsmooveFooter",function(){
        return {
            restrict : 'E',
            templateUrl : "/templates/footer.html"
        };
    });
})();