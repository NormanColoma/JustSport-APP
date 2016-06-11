/**
 * Created by Norman on 08/06/2016.
 */
describe('Back Office Courses Service that handles courses', function() {
    var $httpBackend;
    var baseAPI = 'https://justsport-api.herokuapp.com/api/';
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

    it('Should delete the course correctly', function(){
        $httpBackend.expectDELETE(baseAPI+'courses/1').respond(204);
        var real = null;
        backOCService.deleteCourse(1).then(function(data){
            real = data;
        });
        $httpBackend.flush();
        expect(real).toBeTruthy();
    });

    it('Should not delete the course correctly', function(){
        $httpBackend.expectDELETE(baseAPI+'courses/1').respond(500);
        var real = null;
        backOCService.deleteCourse(1).then(function(data){
            real = data;
        });
        $httpBackend.flush();
        expect(real).toBeFalsy();
    });

    it('Should add the course correctly', function(){
        var data = {
            id: 2, sportId: 3, establishmentId: 1,
            instructor: "Juan Castaño", price: 20.75, info: "Un curso muy completo"
        };
        var expected_data = {
            id: 2, instructor: "Juan Castaño", price: 20.75, info: "Un curso muy completo"
        };
        var d = {
            sportId: 3, establishmentId: 1,
            instructor: "Juan Castaño", price: 20.75, info: "Un curso muy completo"
        };
        $httpBackend.expectPOST(baseAPI+'courses/new').respond(201,data);
        var real = null;
        backOCService.add(d).then(function(data){
            real = data;
        });
        $httpBackend.flush();
        expect(expected_data).toEqual(real);
    });

    it('Should not add the course correctly', function(){
        var d = {
            sportId: 3, establishmentId: 1,
            instructor: "Juan Castaño", price: 20.75, info: "Un curso muy completo"
        };
        $httpBackend.expectPOST(baseAPI+'courses/new').respond(500);
        var real = null;
        backOCService.add(d).then(function(data){
            real = data;
        });
        $httpBackend.flush();
        expect(real).toBeFalsy();
    });
});