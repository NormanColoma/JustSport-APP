/**
 * Created by Norman on 07/06/2016.
 */
describe('Back Office Estab Controller', function() {
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
            return $controller('BackOfficeSportController', {'$scope': $rootScope});
        };
    }));

    var sport = {name: "Natación"};

});