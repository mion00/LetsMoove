/**
 * Created by mion00 on 18/11/15.
 */

var pathServices = angular.module('pathServices', ['ngResource']);

pathServices.factory('Path', ['$resource',
    function ($resource) {
        return $resource('/api/paths.json', {}, {
            query: {method: 'GET', params: {pathId: 'phones'}}
        });
    }]);