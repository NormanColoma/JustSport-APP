/**
 * Created by Norman on 08/06/2016.
 */
fdescribe('Back Office Courses Service that handles courses', function() {
    var $httpBackend;
    var baseAPI = 'https://localhost:3000/api/';
    var backOCService;

    beforeEach(module('justSport'));

    beforeEach(inject(function ($injector, backOfficeCoursesService) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        backOCService = backOfficeCoursesService;
    }));

    it('Should modify the course correctly', function(){
        var data = {info: "La información ha cambiado"};
        $httpBackend.expectPUT(baseAPI+'courses/1').respond(204);
        var real = null;
        backOCService.update(1,data).then(function(data){
            real = data;
        });
        $httpBackend.flush();
        expect(real).toBeTruthy();
    });

    it('Should not modify the course correctly', function(){
        var data = {info: "La información ha cambiado"};
        $httpBackend.expectPUT(baseAPI+'courses/1').respond(500);
        var real = null;
        backOCService.update(1,data).then(function(data){
            real = data;
        });
        $httpBackend.flush();
        expect(real).toBeFalsy();
    });
});