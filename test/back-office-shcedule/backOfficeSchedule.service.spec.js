/**
 * Created by Norman on 10/06/2016.
 */
describe('Back Office Schedule Service that handles schedules', function() {
    var $httpBackend;
    var baseAPI = 'https://localhost:3000/api/';
    var backOSService;

    beforeEach(module('justSport'));

    beforeEach(inject(function ($injector, backOfficeScheduleService) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        backOSService = backOfficeScheduleService;
    }));

    it('Should delete the schedule correctly', function(){
        $httpBackend.expectDELETE(baseAPI+'schedules/1').respond(204);
        var real = null;
        backOSService.deleteSchedule(1).then(function(data){
            real = data;
        });
        $httpBackend.flush();
        expect(real).toBeTruthy();
    });

    it('Should not delete the schedule correctly', function(){
        $httpBackend.expectDELETE(baseAPI+'schedules/1').respond(500);
        var real = null;
        backOSService.deleteSchedule(1).then(function(data){
            real = data;
        });
        $httpBackend.flush();
        expect(real).toBeFalsy();
    });

});