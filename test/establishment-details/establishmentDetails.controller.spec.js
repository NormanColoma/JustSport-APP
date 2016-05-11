describe('Establishment Details Controller', function() {
    var $httpBackend, $rootScope, createController;
    var baseAPI = 'https://localhost:3000/api/';
    var estab = {id: 1,name: "Nombre Gym", desc: "Esta es la desc",city: "Alicante",
        province: "Alicante", addr: "Esta es la dirección", phone: "965660427", website: "www.pagina.com",
        main_img:"default.jpg", Votes:[{user: "8a74a3aa-757d-46f1-ba86-a56a0f107735"}],
        Commentaries:[{id: 1,
            text: "El gimnasio tiene unas instalaciones increíbles",
            createdAt: "2016-05-11T09:02:45.000Z"}]
    };

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
            return $controller('EstablishmentDetailsController', {'$scope': $rootScope});
        };
    }));

    it('Should fetch the establishment', function(){
        var controller = createController();
        $httpBackend.expectGET(baseAPI+'establishments/1').respond(estab);
        expect(controller.establishment).toBe({});
        expect(controller.votes).toBe([]);
        expect(controller.commentaries).toBe([]);
        /* jshint ignore:start*/
        controller.getEstablishment(1);
        /*jshint ignore:end */
        $httpBackend.flush();
        var expected_estab = {id: 1,name: "Nombre Gym", desc: "Esta es la desc",city: "Alicante",
            province: "Alicante", addr: "Esta es la dirección", phone: "965660427", website: "www.pagina.com",
            main_img:"default.jpg"};
        expect(controller.establishment).toEqual(expected_estab);
        expect(controller.votes).toEqual(estab.Votes);
        expect(controller.commentaries).toEqual(estab.Commentaries);
    });
});
