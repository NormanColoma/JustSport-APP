describe('Show Schedule Controller', function() {
    var $httpBackend, $rootScope, createController;
    var baseAPI = 'https://localhost:3000/api/';

    beforeEach(module('justSport'));

    beforeEach(inject(function ($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        // Get hold of a scope (i.e. the root scope)
        $rootScope = $injector.get('$rootScope');
        // The $controller service is used to create instances of controllers
        var $controller = $injector.get('$controller');

        createController = function () {
            return $controller('ShowScheduleController', {'$scope': $rootScope});
        };
    }));

    it('Should fetch the schedule', function(){
        var controller = createController();
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
        $httpBackend.expectGET(baseAPI+'establishments/1/sport/1/schedule').respond(schedule);
        controller.getSchedule(1,1);
        $httpBackend.flush();
        expect(controller.schedule).toEqual(schedule.Schedule.rows);
    });

    it('Should order the schedule by days and time', function(){
        var controller = createController();
        var course1 = {sportId:'1', establishmentId:'1',instructor: 'Juan Domínguez',price:'17.50',info:'Un curso muy completo'};
        var s1 = {day: 'Martes', startTime: '10:00', endTime:"11:00", courseId: 1};
        var s2 = {day: 'Lunes', startTime: '11:00', endTime:"12:00", courseId: 1};
        var s3 = {day: 'Miércoles', startTime: '17:00', endTime:"18:00", courseId: 1};
        var s5 = {day: 'Jueves', startTime: '20:00', endTime:"21:00", courseId: 1};
        var s4 = {day: 'Jueves', startTime: '12:00', endTime:"13:00", courseId: 1};
        var s6 = {day: 'Viernes', startTime: '09:00', endTime:"10:00", courseId: 1};
        var s7 = {day: 'Viernes', startTime: '09:30', endTime:"10:30", courseId: 2};
        var s8 = {day: 'Domingo', startTime: '19:00', endTime:"20:00", courseId: 2};
        var s9 = {day: 'Domingo', startTime: '18:00', endTime:"19:00", courseId: 2};
        var schedule = {Schedule: {
            count: 6,
            rows: [s1,s2,s3,s4,s5,s6,s7,s8,s9]
        }};
        $httpBackend.expectGET(baseAPI+'establishments/1/sport/1/schedule').respond(schedule);
        controller.getSchedule(1,1);
        $httpBackend.flush();
        var ordered = controller.orderSchedule(controller.schedule);
        expect(ordered[0]).toEqual(s2);
        expect(ordered[1]).toEqual(s1);
        expect(ordered[2]).toEqual(s3);
        expect(ordered[3]).toEqual(s4);
        expect(ordered[4]).toEqual(s5);
        expect(ordered[5]).toEqual(s6);
        expect(ordered[6]).toEqual(s7);
        expect(ordered[7]).toEqual(s9);
        expect(ordered[8]).toEqual(s8);
    });
});