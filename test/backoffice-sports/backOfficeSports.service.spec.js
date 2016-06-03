/**
 * Created by Norman on 02/06/2016.
 */
describe('Back Office Sport Service that handle operations relative to sports', function() {
    var $httpBackend;
    var baseAPI = 'https://justsport-api.herokuapp.com/api/';;
    var backOSpService;

    var data = {id: 1};
    // Set up the module
    beforeEach(module('justSport'));

    beforeEach(inject(function ($injector, backOfficeSportService) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        backOSpService = backOfficeSportService;
    }));

    it('Should associate the sport to establishment', function(){
        $httpBackend.expectPUT(baseAPI+'establishments/1/sports/new').respond(204);
        var real = null;
        backOSpService.associateSp(1,data).then(function(data){
            real = data;
        });
        $httpBackend.flush();
        expect(real).toBeTruthy();
    });

    it('Should not associate the sport to establishment', function(){
        $httpBackend.expectPUT(baseAPI+'establishments/1/sports/new').respond(500);
        var real = null;
        backOSpService.associateSp(1,data).then(function(data){
            real = data;
        });
        $httpBackend.flush();
        expect(real).toBeFalsy();
    });
});