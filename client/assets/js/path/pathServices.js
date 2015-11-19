/**
 * Created by mion00 on 18/11/15.
 */

var pathServices = angular.module('pathServices', ['ngResource', 'apiURLs']);

pathServices.factory('Path', ['$resource', 'apiURL',
    function ($resource, apiURL) {
        return $resource(apiURL.buildURL("paths/:pathId"), {}, {
            query: {method: 'GET'}
        });
    }]);