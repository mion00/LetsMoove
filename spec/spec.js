/**
 * Created by marco on 30/11/15.
 */

describe('pathTesting', function() {
    beforeEach(module('pathControllers'));

    var $controller;

    beforeEach(inject(function(_$controller_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

    describe('chekPath', function() {
        it('ottiene le informazioni relative a un persorso', function() {
            var $scope = {};
            var controller = $controller('pathsController', { $scope: $scope });
            expect($scope.zoom).toEqual(11);
        });
    });
});