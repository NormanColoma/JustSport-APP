/**
 * Created by Norman on 26/04/2016.
 */
angular
    .module('justSportTest')
    .run(showScheduleTest);

    showScheduleTest.$inject = ['$httpBackend'];

    function showScheduleTest($httpBackend){
        var local_api = "https://localhost:3000/api";
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
        var course1 = {Sport:{id: '1'},Establishment:{id:'1'},
            instructor: 'Juan Domínguez',price:'17.50',info:'Un curso muy completo'};
        var message = {message: 'There is no schedule established yet'};
        $httpBackend.whenGET(local_api + '/establishments/1/sport/1/schedule').respond(schedule);
        $httpBackend.whenGET(local_api + '/courses/1').respond(course1);
        $httpBackend.whenGET(local_api + '/establishments/2/sport/1/schedule').respond(message);
        $httpBackend.whenGET('app/home/est-schedule.tmpl.html').passThrough();
    }