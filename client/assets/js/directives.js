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

    app.directive("loadingPart",function(){
        return {
            restrict : 'E',
            templateUrl : "/templates/loading.html",
            controller: ['$interval','$scope',function($interval,$scope){
                var scope=$scope;
                scope.icons = ['explore','place','search','map'];
                scope.icon = {};
                $interval(function(){
                    var name=scope.icons.shift();
                    scope.icon.name=name;
                    scope.icons.push(name);
                }, 1500);

                scope.icon.name = 'search';
                scope.icon.color = 'rgb(63,81,181)';
            }]
        };
    })
})();