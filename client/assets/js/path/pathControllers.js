/**
 * Created by mion00 on 18/11/15.
 */
(function () {
    var app = angular.module('pathControllers', ['pathServices', 'ui.router', 'uiGmapgoogle-maps', 'terrainTypeServices', 'userServices']);

    app.controller('pathDetailsController', ['$stateParams', 'Path', 'User', 'uiGmapGoogleMapApi', function ($stateParams, Path, User, uiGmapGoogleMapApi) {
        var scope = this;

        var callback = function (path) {
            scope.path = path;
            scope.marker = {};
            User.get({teamId: scope.path.owner, projection: {username: 1}}, function (name) {
                scope.path.owner = name.username;
            }, function () {
                console.log("FAIL");
            })
            scope.marker.coordinates = jQuery.extend(true, {}, path.locationData.startPoint);
            scope.marker.options = {labelClass: 'marker_labels', labelAnchor: '10 60', labelContent: path.name}
        };

        var error = function () {
            console.log("FAIL");
        };


        Path.query({pathId: $stateParams.pathId}, callback, error);
        scope.zoom = 14;

    }]);

    app.controller('pathsController', ['$stateParams', 'Path', 'TerrainType', 'uiGmapGoogleMapApi', '$scope', function ($stateParams, Path, TerrainType, uiGmapGoogleMapApi, $scope) {
        var scope = this;
        this.zoom = 5;

        this.durationClasses = [
            {
                id: 0,
                value: [0, 1000000],
                label: "qualsiasi"
            },
            {
                id: 1,
                value: [0, 30],
                label: " < 30 min"
            },
            {
                id: 2,
                value: [30, 120],
                label: " 30 min - 1 h"
            },
            {
                id: 3,
                value: [120, 240],
                label: " 1 h - 2 h"
            },
            {
                id: 4,
                value: [240, 100000],
                label: " > 2 h"
            }
        ];

        this.lengthClasses = [
            {
                id: 0,
                value: [0, 10000000000],
                label: "qualsiasi"
            },
            {
                id: 1,
                value: [0, 1000],
                label: " < 1 Km"
            },
            {
                id: 2,
                value: [1000, 5000],
                label: " 1 Km - 5 Km"
            },
            {
                id: 3,
                value: [5000, 10000],
                label: " 5 Km - 10 Km"
            },
            {
                id: 4,
                value: [10000, 1000000000],
                label: " > 10 Km"
            }
        ];
        this.terrainTypes = {};
        TerrainType.get({}, function (terrainTypes) {
            scope.terrainTypes = terrainTypes._items;
            scope.terrainTypes.push({type: "qualsiasi", _id: 0});
        }, function () {
            console.log("ERROR");
        })
        this.duration = 0;
        this.length = 0;
        this.terrainType = "qualsiasi";

        this.location =
        {
            latitude: 43,
            longitude: 12
        };
        this.range = 20;
        this.paths = [];
        this.address = "";

        this.markers = [];

        this.lastQuery = {};


        navigator.geolocation.getCurrentPosition(function (position) {
            scope.location = {latitude: position.coords.latitude, longitude: position.coords.longitude};
            scope.zoom = 11;
            $scope.$apply();

            scope.updateAddressFromLocation();

            scope.updateData();
        });

        this.updateAddressFromLocation = function () {
            var latlng = new google.maps.LatLng(scope.location.latitude, scope.location.longitude);
            scope.geocoder.geocode({'latLng': latlng}, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        scope.address = results[1].formatted_address;
                        $scope.$apply();
                    }
                }
            });
        }

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
                        options: {
                            labelClass: 'marker_labels',
                            labelAnchor: '10 60',
                            labelContent: scope.paths[i].name,
                            animation: google.maps.Animation.DROP
                        }
                    });
            }
        }

        scope.updateLocationFromAddress = function () {
            scope.geocoder.geocode({"address": scope.address}, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
                    scope.location.latitude = results[0].geometry.location.lat();
                    scope.location.longitude = results[0].geometry.location.lng();
                    scope.address = results[0].formatted_address;
                    $scope.$apply();
                }
            });
        };

        scope.updateData = function () {
            var query = {
                where: {
                    "locationData.startPoint": {
                        $near: {
                            $geometry: {
                                type: "Point",
                                coordinates: [scope.location.longitude, scope.location.latitude]
                            },
                            $maxDistance: scope.range * 1000
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
            if (scope.terrainType != "qualsiasi") {
                query.where["pathData.terrainType"] = scope.terrainType;
            }
            if (query != scope.lastQuery) {
                console.log(query);
                Path.get(query,
                    function (path) {
                        console.log(path._items);
                        scope.paths = path._items;
                        scope.markers = [];
                        scope.updateMarkers();
                    }, function () {
                        console.log("FAIL");
                    });
                scope.lastQuery = query;
            }

        }

    }]);

    app.controller('pathInsertionController', ['Path', 'TerrainType', 'uiGmapGoogleMapApi', '$scope', function (Path, TerrainType, uiGmapGoogleMapApi, $scope) {
        var scope = this;

        this.path = {
            name: "",
            subtitle: "",
            description: "",
            ownerVote: {
                beauty: 1,
                difficulty: 1,
                complexity: 1
            },
            pathData: {
                length: 0,
                altitude: 0,
                deltaAltitude: 0,
                adventure: false,
                time: 0
            },
            locationData: {
                startPoint: {},
                stages: [{
                    location: {
                        type: "Point",
                        coordinates: []
                    },
                    question: "",
                    answer: ""
                }]
            }

        };
        this.zoom = 2;
        this.center = {
            type: "Point",
            coordinates: [0, 20]
        };
        this.markers = [];

        this.terrainTypes = {};
        TerrainType.get({}, function (terrainTypes) {
                scope.terrainTypes = terrainTypes._items;
                scope.path.pathData.terrainType = scope.terrainTypes[0].type;
            },
            function () {
                console.log("ERROR");
            }
        );

        this.log = function () {
            console.log(scope);
        }


        uiGmapGoogleMapApi.then(function (maps) {
            scope.geocoder = new google.maps.Geocoder();
            scope.distanceMatrix = new google.maps.DistanceMatrixService();
            scope.elevator = new google.maps.ElevationService;
            //scope.updateMarkers(); //to remove
            scope.computePathData();
            scope.pathIcon = [{
                icon: {
                    path: google.maps.SymbolPath.FORWARD_OPEN_ARROW
                },
            }];
        });

        this.updateMarkers = function () {
            var stages = [{
                location: {
                    type: "Point",
                    coordinates: [12, 46]
                },
                question: "",
                answer: ""
            },
                {
                    location: {
                        type: "Point",
                        coordinates: [12, 46.5]
                    },
                    question: "",
                    answer: ""
                },
                {
                    location: {
                        type: "Point",
                        coordinates: [12, 46.7]
                    },
                    question: "",
                    answer: ""
                }];
            for (var i = 0; i < stages.length; i++) {
                scope.markers.push(
                    {
                        id: i,
                        latitude: stages[i].location.coordinates[1],
                        longitude: stages[i].location.coordinates[0],
                        title: (i + 1),
                        options: {
                            label: (""+(i+1)),
                            draggable: true,
                        }
                    });
            }
        }; //to remove

        this.updateStagesFromMarkers = function () {
            for (var i = 0; i < scope.markers; i++) {
                scope.path.locationData.stages[i].location = {
                    type: "Point",
                    coordinates: [scope.markers[i].longitude, scope.markers[i].latitude]
                };
            }
            this.path.locationData.startPoint = this.path.locationData.stages[0].location;
        };

        this.addNewStage = function (){
            var marker = {
                address: "",
                id: scope.markers.length,
                title: scope.markers.length,
                options: {
                    label: ""+(1+scope.markers.length),
                    draggable: true,
                }
            };
            marker.updateLocation = function(){

                scope.geocoder.geocode({"address": marker.address}, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
                        marker.latitude = results[0].geometry.location.lat();
                        marker.longitude = results[0].geometry.location.lng();
                        marker.address = results[0].formatted_address;
                        console.log(results[0]);
                        var meanLat = 0;
                        var meanLng = 0;
                        scope.markers.forEach(function(m){
                            meanLat+= m.latitude/scope.markers.length;
                            meanLng+= m.longitude/scope.markers.length;
                        });

                        scope.center.coordinates[0]=meanLng;
                        scope.center.coordinates[1]=meanLat;

                        scope.zoom=15;
                        scope.computePathData();
                        $scope.$apply();
                    }
                });



                console.log(scope.center);

            }
            scope.markers.push(marker);
        }
        this.computePathData = function () {
            var stages = scope.markers; // to update
            scope.path.pathData.length = 0;
            scope.path.pathData.time = 0;

            for (var i = 0; i < stages.length - 1; i++) {
                var origin = {lat: stages[i].latitude, lng: stages[i].longitude};
                var destination = {lat: stages[i + 1].latitude, lng: stages[i + 1].longitude};

                scope.distanceMatrix.getDistanceMatrix({
                    origins: [origin],
                    destinations: [destination],
                    travelMode: google.maps.TravelMode.WALKING,
                    unitSystem: google.maps.UnitSystem.METRIC
                }, function (response, status) {
                    if (status !== google.maps.DistanceMatrixStatus.OK) {
                        alert('Error was: ' + status);
                    } else {
                        if (response.rows.length == 1) {
                            console.log(response.rows[0].elements[0]);
                            scope.path.pathData.length += response.rows[0].elements[0].distance.value;
                            scope.path.pathData.time += Math.floor(response.rows[0].elements[0].duration.value / 60);
                        } else {
                            console.log("error");
                        }
                        $scope.$apply();
                    }
                });

            }
            var minh = 10000000, maxh = -10000000;
            scope.path.pathData.altitude = 0;
            for (var i = 0; i < stages.length; i++) {
                var stage = {lat: stages[i].latitude, lng: stages[i].longitude};
                scope.elevator.getElevationForLocations({
                    'locations': [stage]
                }, function (responce) {
                    console.log(responce[0].elevation);
                    if (responce[0].elevation < minh) {
                        minh = responce[0].elevation
                    }
                    if (responce[0].elevation > maxh) {
                        maxh = responce[0].elevation
                    }
                    console.log(Math.floor(responce[0].elevation / stages.length));
                    scope.path.pathData.altitude += Math.floor(responce[0].elevation / stages.length);
                    scope.path.pathData.deltaAltitude = Math.floor(maxh - minh);
                });
            }
        };

    }]);

}());