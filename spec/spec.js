/**
 * Created by marco on 30/11/15.
 */

//describe('userTesting', function() {
//    beforeEach(module('userControllers'));
//    beforeEach(module('userServices'));
//
//    var $controller;
//    var AuthenticationService;
//    beforeEach(inject(function(_$controller_,_AuthenticationService_){
//        // The injector unwraps the underscores (_) from around the parameter names when matching
//        $controller = _$controller_;
//        AuthenticationService = _AuthenticationService_;
//    }));
//
//
//    describe('userTesting', function() {
//        var scope = { username: "test", password: "test"};
//        var loginController =  $controller('loginController', { $scope: scope });
//
//
//
//        it('should tell the correct username', function() {
//
//            expect(AuthenticationService.userData.username).toEqual("test");
//        });
//    });
//});

describe('user controllers', function() {
    beforeEach(module('userControllers'));
    beforeEach(module('userServices'));

    var scope, AuthenticationService, User, $httpBackend;

    beforeEach(inject(function ($rootScope, $controller,_AuthenticationService_,_User_, $injector) {
        AuthenticationService = _AuthenticationService_;
        User = _User_;
        scope = $rootScope.$new();
        $httpBackend = $injector.get("$httpBackend");

        createLoginController =  function() {return $controller('loginController', {
                '$scope': scope
            })};

        createUserDataController =  function() { return $controller('userDataController', {
                '$scope': scope
            })};


        createLogoutController = function() { return $controller('logoutController', {
                '$scope': scope
            })};

    }));

    it('should let user log in', function() {
        var loginController = createLoginController();
        loginController.username="test";
        loginController.password="test";
        loginController.doLogin();
        var userDataController = createUserDataController();
        expect(AuthenticationService.userData.loggedIn).toBe(true);
        expect(userDataController.userData.loggedIn).toBe(true);
    });

    it('should tell the correct username', function() {
        var loginController = createLoginController();
        loginController.username="test";
        loginController.password="test";
        loginController.doLogin();
        var userDataController = createUserDataController();
        expect(userDataController.userData.username).toBe("test");
    });

    it('should let the user log out', function() {
        var loginController = createLoginController();
        loginController.username="test";
        loginController.password="test";
        loginController.doLogin();
        var userDataController = createUserDataController();
        expect(userDataController.userData.loggedIn).toBe(true);
        var logoutController = createLogoutController();
        logoutController.logout();
        expect(userDataController.userData.loggedIn).toBe(false);
        expect(userDataController.userData.username).toBe("");
    });
});