/**
 * Created by Norman on 21/04/2016.
 */
describe('Schedule Service that retrieves shcedule and courses', function() {
    var $httpBackend;
    var baseAPI = 'https://localhost:3000/api/';
    var sechService;
    // Set up the module
    beforeEach(module('justSport'));

    beforeEach(inject(function ($injector, getScheduleService) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        sechService = getScheduleService;
    }));

    it('Should return the course passing its id', function(){
        var course1 = {sportId:'1', establishmentId:'1',instructor: 'Juan Domínguez',price:'17.50',info:'Un curso muy completo'};
        $httpBackend.expectGET(baseAPI+'courses/1').respond(course1);
        var c1 = null;
        sechService.getCourse(1).then(function(data){
            c1 = data;
        });
        $httpBackend.flush();
        expect(c1).toEqual(coruse1);
    });

    it('Should return message when trying to fetch course that does not exist', function(){
        var message = {message: 'The course was not found'};
        $httpBackend.expectGET(baseAPI+'courses/5').respond(message);
        var c1 = null;
        sechService.getCourse(5).then(function(data){
            c1 = data;
        });
        $httpBackend.flush();
        expect(c1).toEqual(message.message);

    });

    it('Should return the schedule of a course', function(){
        var s1 = {day: 'Martes', startTime: '10:00', endTime:"11:00", courseId: 1};
        var s2 = {day: 'Lunes', startTime: '11:00', endTime:"12:00", courseId: 1};
        var s3 = {day: 'Miércoles', startTime: '17:00', endTime:"18:00", courseId: 1};
        var s5 = {day: 'Jueves', startTime: '20:00', endTime:"21:00", courseId: 1};
        var s4 = {day: 'Jueves', startTime: '12:00', endTime:"13:00", courseId: 1};
        var s6 = {day: 'Viernes', startTime: '09:00', endTime:"10:00", courseId: 1};
        var schedule = {Schedule: {
            count: 6,
            rows: [s1,s2,s3,s4,s5,s6]
        }};
        $httpBackend.expectGET(baseAPI+'courses/1/schedule').respond(schedule);
        var s = null;
        sechService.getSchedule(1).then(function(data){
            s = data;
        });
        $httpBackend.flush();
        expect(s).toEqual(schedule.rows);
    });

    it('Should return message when trying to fetch schedule from course that does not exist', function(){
        var message = {message: 'The course was not found'};
        $httpBackend.expectGET(baseAPI+'courses/5/schedule').respond(message);
        var c1 = null;
        sechService.getCourse(5).then(function(data){
            c1 = data;
        });
        $httpBackend.flush();
        expect(c1).toEqual(message.message);
    });

    it('Should return message when trying to fetch schedule that is not set yet', function(){
        var message = {message: 'There are no schedules for this course'};
        $httpBackend.expectGET(baseAPI+'courses/5/schedule').respond(message);
        var c1 = null;
        sechService.getCourse(5).then(function(data){
            c1 = data;
        });
        $httpBackend.flush();
        expect(c1).toEqual(message.message);
    });

});