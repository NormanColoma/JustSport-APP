describe('Establishment Filtered Controller', function() {
    var $httpBackend, $rootScope, createController;
    var baseAPI = 'https://localhost:3000/api/';
    var est1 = {id: 1,name: 'Gym A Tope', desc: 'Gimnasio perfecto para realizar tus actividades deportivas.',
        city: 'San Vicente del Raspeig', province: 'Alicante', addr: 'Calle San Franciso nº15',
        phone: '965660327', website: 'http://wwww.gymatope.es', main_img:'default.jpeg'};
    var est2 = {id: 2,name: 'Gym Noray', desc: 'Gimnasio muy acondicionado y en perfecto estado.',
        city: 'Santa Pola', province: 'Alicante', addr: 'Calle Falsa nº34',
        phone: '965662347', website: 'http://wwww.noraygym.com', main_img:'default.jpeg'};
    var est3 = {id: 4, name: 'Montemar', desc: 'Especializados en cursos y clases de ténis.',
        city: 'Alicante', province: 'Alicante', addr: 'Avenida Novelda Km 14',
        phone: '965662268', website: 'http://wwww.montemar.es', main_img:'default.jpeg'};
    var data = {count: 3, rows: [est1,est2,est3]};
    var cursor = {before: 0, after: 0};
    var paging= {cursors: cursor, previous: 'none', next: 'none'};
    var estabs = {Establishments: data, paging: paging};
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
            return $controller('EstablishmentFilteredController', {'$scope': $rootScope});
        };
    }));

    it('Should fetch all the establishments that match the filter given', function(){
        var controller = createController();
        $httpBackend.expectGET(baseAPI+'establishments/sport/1/location/Alicante').respond(estabs);
        controller.sport = 1;
        controller.location = "Alicante";
        expect(controller.items.length).toBe(0);
        /* jshint ignore:start*/
        controller.fetchMore();
        /*jshint ignore:end */
        $httpBackend.flush();
        expect(controller.items.length).toBe(3);
        expect(controller.items).toEqual(data.rows);
    });

    it('Should not add more establishments, when after cursor given is set to 0', function(){
        var controller = createController();
        $httpBackend.expectGET(baseAPI+'establishments/sport/1/location/Alicante?after=0')
            .respond(404, {message: 'There no more rows to retrieve'});
        controller.sport = 1;
        controller.location = "Alicante";
        controller.after=0;
        expect(controller.items.length).toBe(0);
        /* jshint ignore:start*/
        controller.fetchMore();
        /*jshint ignore:end */
        $httpBackend.flush();
        expect(controller.items.length).toBe(0);
        expect(controller.items).toEqual([]);
    });

});