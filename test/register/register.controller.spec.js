/**
 * Created by Norman on 15/04/2016.
 */
describe('Register Controller', function() {
    var $httpBackend, $rootScope, createController, user;
    var baseAPI = 'https://justsport-api.herokuapp.com/api/';

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
            return $controller('RegisterController', {'$scope': $rootScope});
        };

        user = {
            name:"Pepe", lname:"Cano Gómez", email:"llca@gmail.com", password:"lcano2102",
            gender:"male", role: true
        };
    }));

    it('Should switch the view between login and register views', function(){
        var controller = createController();
        expect(controller.registerView).toBeFalsy();
        controller.changeView();
        expect(controller.registerView).toBeTruthy();
    });

    it('Should call registerService, and register the user', function(){
        var controller = createController();
        $httpBackend.expectPOST(baseAPI+'users/new').respond(user);
        controller.user = user;
        expect(controller.registered).toBeTruthy();
        expect(controller.registeringUser).toBeFalsy();
        controller.register();
        $httpBackend.flush();
        expect(controller.registered).toBeTruthy();
    });

    it('Should call registerService, and not register the user', function(){
        var controller = createController();
        var error = {
            errors: [
                {
                    type: "Duplicated entry",
                    field: "email",
                    message: "The value: 'llca@gmail.com' is already taken"
                }
            ]
        };
        $httpBackend.expectPOST(baseAPI+'users/new').respond(500, error);
        controller.user = user;
        expect(controller.registered).toBeTruthy();
        controller.register();
        $httpBackend.flush();
        expect(controller.registered).toBeFalsy();
    });

});