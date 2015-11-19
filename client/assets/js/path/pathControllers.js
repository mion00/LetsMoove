/**
 * Created by mion00 on 18/11/15.
 */
(function () {
    var app = angular.module('pathControllers', ['pathServices','ui.router','uiGmapgoogle-maps']);

    app.controller('pathListController', ['$scope', 'Path', function ($scope, Path) {
        $scope.result = Path.query({where: {lastname : "doe"}});
    }]);

    app.controller('pathDetailsController',['$stateParams','Path','uiGmapGoogleMapApi',function($stateParams,Path,uiGmapGoogleMapApi){
        var scope = this;

        var callback = function(path){
            scope.path=path;
            scope.marker = jQuery.extend(true, {}, path.stages[0].coordinates);
        };

        var error = function(){
            console.log("FAIL");
        };


        Path.query({pathId:$stateParams.pathId},callback,error);
        scope.zoom = 14;

    }]);

}());