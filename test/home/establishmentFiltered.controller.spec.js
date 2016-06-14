describe('Establishment Filtered Controller', function() {
    var $httpBackend, $rootScope, createController;
    var baseAPI = 'https://justsport-api.herokuapp.com/api/';
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
        $httpBackend.expectGET(baseAPI+'establishments/sport/1/location/Alicante?limit=5').respond(estabs);
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
        $httpBackend.expectGET(baseAPI+'establishments/sport/1/location/Alicante?after=0&limit=5')
            .respond(404, {message: 'There no more rows to retrieve'});
        controller.sport = 1;
        controller.prevSport = 1;
        controller.prevLocation = "Alicante";
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

    it('Should add more establishments', function(){
        var controller = createController();
        $httpBackend.expectGET(baseAPI+'establishments/sport/1/location/Alicante?limit=5')
            .respond(estabs);
        controller.sport = 1;
        controller.prevSport = 1;
        controller.prevLocation = "Alicante";
        controller.location = "Alicante";
        expect(controller.items.length).toBe(0);
        /* jshint ignore:start*/
        controller.fetchMore();
        /*jshint ignore:end */
        $httpBackend.flush();
        expect(controller.items.length).toBe(3);
        controller.after = "NE";
        $httpBackend.expectGET(baseAPI+'establishments/sport/1/location/Alicante?after=NE&limit=5')
            .respond(estabs);
        /* jshint ignore:start*/
        controller.fetchMore();
        /*jshint ignore:end */
        $httpBackend.flush();
        expect(controller.items.length).toBe(3);

    });

    it('Should shorten the description of establishment', function(){
        var controller = createController();
        var string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor " +
            "incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud " +
            "exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor " +
            "in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint " +
            "occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";
        expect(controller.shortenDesc(string)).toEqual("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut a...");
    });

    it('Should shorten the description of establishment, that ends with full stop', function(){
        var controller = createController();
        var string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut a.";
        expect(controller.shortenDesc(string)).toEqual("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut a...");
    });
});