/**
 * Created by Norman on 08/06/2016.
 */
fdescribe('Back Office Courses Controller', function() {
    var $httpBackend, $rootScope, createController;
    var baseAPI = 'https://localhost:3000/api/';

    // Set up the module
    beforeEach(module('justSport'));

    beforeEach(inject(function ($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        // Get hold of a scope (i.e. the root scope)
        $rootScope = $injector.get('$rootScope');
        // The $controller service is used to create instances of controllers
        var $controller = $injector.get('$controller');

        createController = function () {
            return $controller('BackOfficeCoursesController', {'$scope': $rootScope});
        };
    }));
    it('Should update the establishment correctly', function(){
        var controller = createController();
        localStorage.setItem('username','Norman');
        var d = {info: "La información ha cambiado"};
        $httpBackend.expectGET(baseAPI+'establishment/me/all?limit=200').respond(200);
        $httpBackend.expectPUT(baseAPI+'courses/1').respond(204);
        controller.courses = [
            {establishmentId: 1, rows:[
                {
                    "id": 1,
                    "info": "Un curso muy completo",
                    "price": 17.5,
                    "instructor": "Juan Domínguez",
                },
                {
                    "id": 2,
                    "info": "Un curso no tan completo",
                    "price": 20,
                    "instructor": "Pepe Castaño",
                },
                {
                    "id": 3,
                    "info": "Un curso poco completo",
                    "price": 15,
                    "instructor": "María Castro",
                }
            ]}
        ]
        ;
        expect(controller.courses[0].rows.length).toBe(3);
        /* jshint ignore:start*/
        controller.updateCourse(1,d);
        /*jshint ignore:end */
        $httpBackend.flush();
        expect(controller.courses[0].rows[0].info).toEqual("La información ha cambiado");
        localStorage.removeItem('username');
    });

});