/**
 * Created by marco on 26/11/15.
 */
(function () {
    var pathServices = angular.module('terrainTypeServices', ['ngResource', 'apiURLs']);

    pathServices.factory('TerrainType', ['$resource', 'apiURL',
        function ($resource, apiURL) {
            return $resource(apiURL.buildURL("terrainTypes"), {}, {
                query: {method: 'GET'}
            });
        }]);
})();