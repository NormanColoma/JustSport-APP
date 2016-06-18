/**
 * Created by Norman on 10/06/2016.
 */
describe('Back Office Schedule Service that handles schedules', function() {
    var $httpBackend;
    var baseAPI = 'https://justsport-api.herokuapp.com/api/';
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

    it('Should add the schedule correctly', function(){
        var data = {
            day: "Lunes", startTime: "11:00", endTime: "12:00", courseId: 1, id: 5
        };
        $httpBackend.expectPOST(baseAPI+'schedules/new?id=5').respond(201);
        var real = null;
        backOSService.add(data).then(function(data){
            real = data;
        });
        $httpBackend.flush();
        expect(real).toBe(5);
    });

    it('Should not add the schedule correctly', function(){
        var data = {
            day: "Lunes", startTime: "11:00", endTime: "12:00", courseId: 1
        };
        $httpBackend.expectPOST(baseAPI+'schedules/new').respond(500);
        var real = null;
        backOSService.add(data).then(function(data){
            real = data;
        });
        $httpBackend.flush();
        expect(real).toBeFalsy();
    });
});