/**
 * Created by marco on 26/11/15.
 */
(function () {
    var app = angular.module('terrainTypeServices', ['ngResource', 'apiURLs']);

    app.factory('TerrainType', ['$resource', 'apiURL',
        function ($resource, apiURL) {
            return $resource(apiURL.buildURL("terrainTypes"), {}, {
                query: {method: 'GET'}
            });
        }]);
})();