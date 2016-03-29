/**
 * Created by Norman on 27/03/2016.
 */
describe('Service that fetch all the sports', function() {
    var $httpBackend;
    var baseAPI = 'https://localhost:3000/api/';
    var sports = {rows:[{id:1, name: 'Spinning'},{id:2, name: 'GAP'},{id:3, name: 'BodyJump'},{id:4, name: 'Pilates'},
        {id:5, name: 'CrossFit'}], count: 5};
    var Sports = {Sports: sports};
    var spLService;
    // Set up the module
    beforeEach(module('justSport'));

    beforeEach(inject(function ($injector, sportListService) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        spLService = sportListService;
    }));


    //Testing service
    it('Should fetch all the sports', function(){
        $httpBackend.expectGET(baseAPI+'sports?limit=100').respond(Sports);
        var sps= [];
        spLService.getSports().then(function(sports){
            sps = sports;
        });
        $httpBackend.flush();
        expect(sps.count).toBe(5);
        expect(sps).toEqual(sports);
    });
});