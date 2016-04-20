/**
 * Created by Norman on 27/03/2016.
 */
describe('SportList Controller', function() {
    var $httpBackend, $rootScope, createController;
    var baseAPI = 'https://justsport-api.herokuapp.com/api/';
    var sports = {rows:[{id:1, name: 'Spinning'},{id:2, name: 'GAP'},{id:3, name: 'BodyJump'},{id:4, name: 'Pilates'},
        {id:5, name: 'CrossFit'}], count: 5};
    var Sports = {Sports: sports};
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
            return $controller('SportListController', {'$scope': $rootScope});
        };
    }));

    it('Should fetch all the sports', function(){
        var controller = createController();
        $httpBackend.expectGET(baseAPI+'sports?limit=100').respond(Sports);
        expect(controller.sports.length).toBe(0);
        /* jshint ignore:start*/
        controller.loadAll;
        /*jshint ignore:end */
        $httpBackend.flush();
        expect(controller.sports.length).toBe(5);
    });

});