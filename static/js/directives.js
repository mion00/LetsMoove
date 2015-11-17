/**
 * Created by marco on 17/11/15.
 */
(function() {
    var app = angular.module("letsMooveDirectives", []);
    app.directive("letsmooveHeader",function(){
        return {
            restrict : 'E',
            templateUrl : "/static/partials/header.html"
        };
    });

    app.directive("letsmooveFooter",function(){
        return {
            restrict : 'E',
            templateUrl : "/static/partials/footer.html"
        };
    });
})();