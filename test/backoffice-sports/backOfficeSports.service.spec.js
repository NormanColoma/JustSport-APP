/**
 * Created by Norman on 02/06/2016.
 */
fdescribe('Back Office Sport Service that handle operations relative to sports', function() {
    var $httpBackend;
    var baseAPI = 'https://localhost:3000/api/';
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

    fit('Should add the new sport correctly', function(){
        var expected_sp = {id: 8, name: "Natación"};
        $httpBackend.expectPOST(baseAPI+'sports/new').respond(201, expected_sp);
        var real = null;
        var d = {name: "Natación"};
        backOSpService.addSp(d).then(function(data){
            real = data;
        });
        $httpBackend.flush();
        expect(expected_sp).toEqual(real);
    });

    fit('Should not add the sport when it is already added', function(){
        var expected_data = {
            errors: [
                {
                    type: "Duplicated entry",
                    field: "name",
                    message: "The value: 'Spinning' is already taken"
                }
            ]
        };
        $httpBackend.expectPOST(baseAPI+'sports/new').respond(500,expected_data);
        var real = null;
        var d = {name: "Spinning"};
        backOSpService.addSp(d).then(function(data){
            real = data;
        });
        $httpBackend.flush();
        expect("The value: 'Spinning' is already taken").toEqual(real);
    });
});