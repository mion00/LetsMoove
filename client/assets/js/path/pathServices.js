/**
 * Created by mion00 on 18/11/15.
 */
(function () {
    var pathServices = angular.module('pathServices', ['ngResource', 'apiURLs']);

    pathServices.factory('Path', ['$resource', 'apiURL',
        function ($resource, apiURL) {
            return $resource(apiURL.buildURL("paths/:pathId"), {}, {
                query: {method: 'GET'}
            });
        }]);

    pathServices.factory('AddStage', ['$http',function ($http) {
        var service = {
            addMode: {
                active: false
            }
        };
           return service;
        }]);

    pathServices.factory('MapCenterService', [function () {
        var service = {
            center : {}
        };
        return service;
    }]);
})();