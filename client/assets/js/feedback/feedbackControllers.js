/**
 * Created by mion00 on 11/12/15.
 */
(function () {
    var app = angular.module('feedbackControllers', ['feedbackServices', 'userServices']);
    app.controller('addFeedbackController', ['Path', 'User', 'Feedback', '$stateParams', function (Path, User, Feedback, $stateParams) {
        var scope = this;

        this.beauty = 1;
        this.complexity = 1;
        this.difficulty = 1;

        var callback = function (path) {
            scope.path = path;
            User.get({teamId: scope.path.owner, projection: {username: 1}}, function (name) {
                scope.path.owner = name.username;
            }, function () {
                console.log("FAIL");
            })
        };

        var error = function () {
            console.log("FAIL");
        };

        Path.query({pathId: $stateParams.pathId}, callback, error);
    }]);
    app.controller('showFeedbackController', ['Path', 'User', 'Feedback', '$stateParams', function (Path, User, Feedback, $stateParams) {
        var scope = this;

        Feedback.query({
                where: {
                    path: Number($stateParams.pathId)
                }
            },
            function (data) {
                scope.feedback = data._items;
            });
    }]);
    app.controller("userPathsFeedback", ['Path', 'Feedback', function (Path, Feedback) {
        var scope = this;
        var userID = 3;
        var userPaths = [];
        scope.feedback = [];

        Path.query({
            where: {
                owner: userID
            }
        }, function (data) {
            console.log("path utente");
            console.log(data);
            data._items.forEach(function (path) {
                userPaths.push(path.id);
            });
            if (userPaths.length > 0) {
                getUserFeedback();
            }
        });

        getUserFeedback = function () {
            Feedback.query({
                    where: {
                        path: {
                            $in: userPaths
                        }
                    }
                },
                function (data) {
                    scope.feedback = data._items;
                });
        }
    }]);
})();
