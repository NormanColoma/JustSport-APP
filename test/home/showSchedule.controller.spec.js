describe('Show Schedule Controller', function() {
    var $httpBackend, $rootScope, createController;
    var baseAPI = 'https://justsport-api.herokuapp.com/api/';

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

    it('Should fetch the course', function(){
        var controller = createController();
        var course1 = {Sport:{id: '1'},Establishment:{id:'1'},
            instructor: 'Juan Domínguez',price:'17.50',info:'Un curso muy completo'};
        $httpBackend.expectGET(baseAPI+'courses/1').respond(course1);
        controller.getCourse(1);
        $httpBackend.flush();
        var expected = {sportId: '1', establishmentId:'1',
            instructor: 'Juan Domínguez',price:'17.50',info:'Un curso muy completo'};
        expect(controller.course).toEqual(expected);
    });
});