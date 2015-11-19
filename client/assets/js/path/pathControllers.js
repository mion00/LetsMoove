/**
 * Created by mion00 on 18/11/15.
 */

var pathControllers = angular.module('pathControllers', ['pathServices']);

pathControllers.controller('pathListController', ['$scope', 'Path', function ($scope, Path) {
    $scope.result = Path.query({where: {lastname : "doe"}});
}]

);