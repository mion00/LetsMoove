/**
 * Created by mion00 on 18/11/15.
 */
(function () {
    var app = angular.module('pathControllers', ['pathServices', 'ui.router', 'uiGmapgoogle-maps', 'terrainTypeServices']);

    app.controller('pathListController', ['$scope', 'Path', function ($scope, Path) {
        $scope.result = Path.query({where: {lastname: "doe"}});
    }]);

    app.controller('pathDetailsController', ['$stateParams', 'Path', 'uiGmapGoogleMapApi', function ($stateParams, Path, uiGmapGoogleMapApi) {
        var scope = this;

        var callback = function (path) {
            scope.path = path;
            scope.marker = jQuery.extend(true, {}, path.locationData.startPoint.coordinates);
        };

        var error = function () {
            console.log("FAIL");
        };


        Path.query({pathId: $stateParams.pathId}, callback, error);
        scope.zoom = 14;

    }]);

    app.controller('pathsController', ['$stateParams', 'Path', 'TerrainType','uiGmapGoogleMapApi', '$scope', function ($stateParams, Path, TerrainType, uiGmapGoogleMapApi, $scope) {
        var scope = this;
        this.zoom = 5;

        this.durationClasses= [
            {
                id : 0,
                value : [0,1000000],
                label : "qualsiasi"
            },
            {
                id : 1,
                value : [0,30],
                label : " < 30 min"
            },
            {
                id : 2,
                value : [30,120],
                label : " 30 min - 1 h"
            },
            {
                id : 3,
                value : [120,240],
                label : " 1 h - 2 h"
            },
            {
                id : 4,
                value : [240,100000],
                label : " > 2 h"
            }
        ];

        this.lengthClasses= [
            {
                id : 0,
                value : [0,1000000],
                label : "qualsiasi"
            },
            {
                id : 1,
                value : [0,1],
                label : " < 1 Km"
            },
            {
                id : 2,
                value : [1,5],
                label : " 1 Km - 5 Km"
            },
            {
                id : 3,
                value : [5,10],
                label : " 5 Km - 10 Km"
            },
            {
                id : 4,
                value : [10,100000],
                label : " > 10 Km"
            }
        ];
        this.terrainTypes = {};
        TerrainType.get({},function(terrainTypes){
            scope.terrainTypes = terrainTypes._items;
            scope.terrainTypes.push({type:"qualsiasi",_id:0});
        },function(){console.log("ERROR");})
        this.duration = 0;
        this.length = 0;
        this.terrainType = 0;

        this.location =
        {
            latitude: 43,
            longitude: 12
        };
        this.range = 20;
        this.paths = [];
        this.address = "";

        this.markers = [];


        navigator.geolocation.getCurrentPosition(function (position) {
            scope.location = {latitude: position.coords.latitude, longitude: position.coords.longitude};
            scope.zoom = 11;
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

            scope.updateData();
        });

        uiGmapGoogleMapApi.then(function (maps) {
            scope.geocoder = new google.maps.Geocoder();
        });

        scope.updateMarkers = function () {
            for (var i = 0; i < scope.paths.length; i++) {
                scope.markers.push(
                    {
                        id: i,
                        latitude: scope.paths[i].locationData.startPoint.coordinates[1],
                        longitude: scope.paths[i].locationData.startPoint.coordinates[0],
                        title: scope.paths[i].name,
                        options: {labelClass: 'marker_labels', labelAnchor: '10 60', labelContent: scope.paths[i].name}
                    });
            }
        }

        scope.updateAddress = function () {
            scope.zoom = 11;
            scope.geocoder.geocode({"address": scope.address}, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
                    scope.location.latitude = results[0].geometry.location.lat();
                    scope.location.longitude = results[0].geometry.location.lng();
                    scope.address = results[0].formatted_address;
                    $scope.$apply();
                }
            });
            scope.updateData();
        };

        scope.updateData = function () {
            var query = {
                where: {
                    "locationData.startPoint": {
                        $near: {
                            $geometry: {
                                type: "Point",
                                coordinates: [scope.location.latitude, scope.location.longitude]
                            },
                            $maxDistance: scope.range
                        }
                    },
                    "pathData.time": {
                        $gt: scope.durationClasses[scope.duration].value[0],
                        $lt: scope.durationClasses[scope.duration].value[1]
                    },
                    "pathData.length": {
                        $gt: scope.lengthClasses[scope.length].value[0],
                        $lt: scope.lengthClasses[scope.length].value[1]
                    }
                }
            };
            if(scope.terrainType!=0)
            {
                query.where["locationData.terrainType"] = {_id: scope.terrainType };
            }



            console.log(query);
            Path.get(query,
                function (path) {
                    console.log(path._items);
                    scope.paths = path._items;
                    scope.paths = [{
                        name: "passeggiata fra i monti",
                        locationData: {
                            startPoint: {
                                coordinates: [11, 46]
                            }
                        }
                    },
                        {
                            name: "Il bosco dei misteri",
                            locationData: {
                                startPoint: {
                                    coordinates: [11.2, 46.3]
                                }
                            }
                        },
                        {
                            name: "Giro della pineta",
                            locationData: {
                                startPoint: {
                                    coordinates: [10.8, 45.9]
                                }
                            }
                        }];//to remove
                    scope.updateMarkers();
                }, function () {
                    console.log("FAIL");
                });
        }

    }]);

}());