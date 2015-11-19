/**
 * Created by mion00 on 18/11/15.
 */
(function () {
    var app = angular.module('pathControllers', ['pathServices']);

    app.controller('pathListController', ['$scope', 'Path', function ($scope, Path) {
        $scope.result = Path.query({where: {lastname : "doe"}});
    }]);

    app.contrller('pathDetailsController',['$stateProvider','Path',function($stateProvider,Path){
        var callback = function(){
            console.log("DONE");
        };

        var error = function(){
            console.log("FAIL");
        };

        this.path=Path.query({pathId:$stateProvider.pathId},callback,error);
    }]);

}());