/**
 * Created by Norman on 09/04/2016.
 */
describe('Login Controller', function() {
    var $httpBackend, $rootScope, createController;
    var baseAPI = 'https://localhost:3000/api/';
    // Set up the module
    beforeEach(module('justSport'));

    beforeEach(inject(function ($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        // Get hold of a scope (i.e. the root scope)
        $rootScope = $injector.get('$rootScope');
        // The $controller service is used to create instances of controllers
        var $controller = $injector.get('$controller');

        createController = function () {
            return $controller('LoginController', {'$scope': $rootScope});
        };
    }));

    it('Should set username and role after successful login', function () {
        var controller = createController();
        var token = {access_token: "eyJ0", role: "admin", username: 'Norman', user_id: '8a74a3aa-757d-46f1-ba86-a56a0f107735',
            expires: 123};
        controller.name = null;
        controller.role = null;
        controller.loggedIn = false;
        controller.reload = false;
        expect(controller.name).toBe(null);
        expect(controller.role).toBe(null);
        expect(controller.loggedIn).toBeFalsy();
        $httpBackend.expectPOST(baseAPI+'oauth2/token').respond(token);
        $httpBackend.expectGET(baseAPI+'users/8a74a3aa-757d-46f1-ba86-a56a0f107735').respond(200);
        /* jshint ignore:start*/
        controller.login("Norman", "1234");
        /*jshint ignore:end */
        $httpBackend.flush();
        expect(controller.name).toBe('Norman');
        expect(controller.role).toBe('admin');
        expect(controller.loggedIn).toBeTruthy();
    });

    it('Should not set username and role while providing invalid credentials', function () {
        var controller = createController();
        $httpBackend.expectPOST(baseAPI+'oauth2/token').respond(403, {
            error: "invalid_grant",
            error_description: "Invalid resource owner credentials"
        });
        controller.name = null;
        controller.role = null;
        controller.loggedIn = false;
        controller.reload = false;
        expect(controller.name).toBe(null);
        expect(controller.role).toBe(null);
        expect(controller.loggedIn).toBeFalsy();
        /* jshint ignore:start*/
        controller.login("Pepe", "1");
        /*jshint ignore:end */
        $httpBackend.flush();
        expect(controller.name).toBe(null);
        expect(controller.role).toBe(null);
        expect(controller.loggedIn).toBeFalsy();
    });

    it('Should log out the user', function () {
        var controller = createController();
        controller.name = "Pepe";
        controller.role = "owner";
        controller.loggedIn = true;
        controller.reload = false;
        /* jshint ignore:start*/
        controller.logout();
        /*jshint ignore:end */
        expect(controller.name).toBe(null);
        expect(controller.role).toBe(null);
        expect(controller.loggedIn).toBeFalsy();
    });

    it('should return valid token expiration', function(){
        var controller = createController();
        controller.reload = false;
        var date = new Date();
        date.setTime( date.getTime() + 7 * 86400000 );
        var token = {access_token: "eyJ0", role: "admin", username: 'Norman', user_id: '8a74a3aa-757d-46f1-ba86-a56a0f107735',
            expires: date};
        $httpBackend.expectPOST(baseAPI+'oauth2/token').respond(token);
        $httpBackend.expectGET(baseAPI+'users/8a74a3aa-757d-46f1-ba86-a56a0f107735').respond(200);
        /* jshint ignore:start*/
        controller.login("Norman", "1234");
        /*jshint ignore:end */
        $httpBackend.flush();
        expect(controller.checkToken()).toBeTruthy();
    });

    it('should return invalid token expiration', function(){
        var controller = createController();
        controller.reload = false;
        var token = {access_token: "eyJ0", role: "admin", username: 'Norman', user_id: '8a74a3aa-757d-46f1-ba86-a56a0f107735', expires: 123};
        $httpBackend.expectPOST(baseAPI+'oauth2/token').respond(token);
        $httpBackend.expectGET(baseAPI+'users/8a74a3aa-757d-46f1-ba86-a56a0f107735').respond(200);
        /* jshint ignore:start*/
        controller.login("Norman", "1234");
        /*jshint ignore:end */
        $httpBackend.flush();
        expect(controller.checkToken()).toBeFalsy();
    });
});