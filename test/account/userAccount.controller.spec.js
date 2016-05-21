/**
 * Created by Norman on 19/05/2016.
 */
describe('User Account Controller', function() {
    var $httpBackend, $rootScope, createController;
    var baseAPI = 'https://localhost:3000/api/';
    var user = {uuid: "8a74a3aa-757d-46f1-ba86-a56a0f107735", name: "Norman", lname: "Coloma García",
        email: "ua.norman@gmail.com", gender: "male", role: "admin", img: "default.jpg"
    };

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
            return $controller('UserAccountController', {'$scope': $rootScope});
        };
    }));

    it('Should fetch the user info', function(){
        var controller = createController();
        $httpBackend.expectGET(baseAPI+'users/8a74a3aa-757d-46f1-ba86-a56a0f107735').respond(user);
        controller.user_id="8a74a3aa-757d-46f1-ba86-a56a0f107735";
        expect(controller.user).toEqual({});
        /* jshint ignore:start*/
        controller.getUser();
        /*jshint ignore:end */
        $httpBackend.flush();
        var expected_user = {name: "Norman", lname: "Coloma García", role: "admin", gender:'male',img: "default.jpg"};
        expect(expected_user).toEqual(controller.user);
    });

    it('Should close the account', function(){
        var controller = createController();
        $httpBackend.expectDELETE(baseAPI+'users/8a74a3aa-757d-46f1-ba86-a56a0f107735').respond(204);
        expect(controller.closed).toEqual(false);
        /* jshint ignore:start*/
        controller.closeAccount('8a74a3aa-757d-46f1-ba86-a56a0f107735');
        /*jshint ignore:end */
        $httpBackend.flush();
        expect(controller.closed).toBeTruthy();
    });

    it('Should update the account', function(){
        var data = {pass: "nuevo2015", role: "user", gender: "female"};
        var controller = createController();
        controller.acc = {current:"123"};
        controller.user_id="8a74a3aa-757d-46f1-ba86-a56a0f107735";
        $httpBackend.expectPUT(baseAPI+'users/8a74a3aa-757d-46f1-ba86-a56a0f107735').respond(204);
        expect(controller.updated).toEqual(false);
        /* jshint ignore:start*/
        controller.updateAccount(data,undefined,undefined);
        /*jshint ignore:end */
        $httpBackend.flush();
        expect(controller.updated).toBeTruthy();
    });

});