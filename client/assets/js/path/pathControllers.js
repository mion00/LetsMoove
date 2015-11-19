/**
 * Created by mion00 on 18/11/15.
 */
(function () {
    var app = angular.module('pathControllers', ['pathServices','ui.router']);

    app.controller('pathListController', ['$scope', 'Path', function ($scope, Path) {
        $scope.result = Path.query({where: {lastname : "doe"}});
    }]);

    app.controller('pathDetailsController',['$stateParams','Path',function($stateParams,Path){
        var callback = function(){
            console.log("DONE");
        };

        var error = function(){
            console.log("FAIL");
        };

        this.path=Path.query({pathId:$stateParams.pathId},callback,error);
    }]);

}());