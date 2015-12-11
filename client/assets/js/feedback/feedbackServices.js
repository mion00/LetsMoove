/**
 * Created by mion00 on 11/12/15.
 */
(function () {
    var app = angular.module('feedbackServices', ['ngResource', 'apiURLs']);

    app.factory('Feedback', ['$resource', 'apiURL',
        function ($resource, apiURL) {
            return $resource(apiURL.buildURL("feedback"), {}, {
                query: {method: 'GET', isArray: false}
            });
        }]);
})();