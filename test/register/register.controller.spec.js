/**
 * Created by Norman on 15/04/2016.
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
            return $controller('RegisterController', {'$scope': $rootScope});
        };
    }));

    it('Should switch the view between login and register views', function(){
        var controller = createController();
        expect(controller.registerView).toBeFalsy();
        controller.changeView();
        expect(controller.registerView).toBeTruthy();
    })

});