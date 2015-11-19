/**
 * Created by mion00 on 19/11/15.
 */

angular.module('apiURLs', [])
    .factory('apiURL', function() {
        var apiURL = {};
        apiURL.buildURL = function (resourceName) {
            return "/api/" + resourceName + ".json";
        };
        return apiURL;
    });