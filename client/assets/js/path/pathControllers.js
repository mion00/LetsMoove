/**
 * Created by mion00 on 18/11/15.
 */
(function () {
    var app = angular.module('pathControllers', ['pathServices', 'ui.router', 'uiGmapgoogle-maps']);

    app.controller('pathListController', ['$scope', 'Path', function ($scope, Path) {
        $scope.result = Path.query({where: {lastname: "doe"}});
    }]);

    app.controller('pathDetailsController', ['$stateParams', 'Path', 'uiGmapGoogleMapApi', function ($stateParams, Path, uiGmapGoogleMapApi) {
        var scope = this;

        var callback = function (path) {
            scope.path = path;
            scope.marker = jQuery.extend(true, {}, path.stages[0].coordinates);
        };

        var error = function () {
            console.log("FAIL");
        };


        Path.query({pathId: $stateParams.pathId}, callback, error);
        scope.zoom = 14;

    }]);

    app.controller('pathsController', ['$stateParams', 'Path', 'uiGmapGoogleMapApi', '$scope', function ($stateParams, Path, uiGmapGoogleMapApi, $scope) {
        var scope = this;
        this.location =
        {
            latitude: 43,
            longitude: 12
        };
        this.zoom = 20;
        this.paths = [];
        this.address = "";


        navigator.geolocation.getCurrentPosition(function (position) {

            scope.location= {latitude: position.coords.latitude, longitude: position.coords.longitude};
            scope.zoom=9;
            $scope.$apply();

            var latlng = new google.maps.LatLng(scope.location.latitude, scope.location.longitude);
            scope.geocoder.geocode({'latLng': latlng}, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        scope.address = results[0].formatted_address;
                        $scope.$apply();
                    }
                }
            });


        });

        uiGmapGoogleMapApi.then(function (maps) {
            scope.geocoder = new google.maps.Geocoder();
        });

        scope.updateAddress = function () {
            scope.zoom=9;
            scope.geocoder.geocode( { "address": scope.address}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
                    scope.location.latitude = results[0].geometry.location.lat();
                    scope.location.longitude = results[0].geometry.location.lng();
                    scope.address = results[0].formatted_address;
                    $scope.$apply();
                }
            });
        };


        var callback = function (path) {
            console.log(path);
        };

        var error = function () {
            console.log("FAIL");
        };


        Path.get({}, callback, error);
        scope.zoom = 14;

    }]);

}());