/**
 * Created by Norman on 29/03/2016.
 */
describe('Service that fetch all the establishment filtered by location and sport', function() {
    var $httpBackend;
    var baseAPI = 'https://localhost:3000/api/';
    var homeService;
    var est1 = {id: 1, name: 'Gym A Tope', desc: 'Gimnasio perfecto para realizar tus actividades deportivas.',
        city: 'San Vicente del Raspeig', province: 'Alicante', addr: 'Calle San Franciso nº15',
        phone: '965660327', website: 'http://wwww.gymatope.es', main_img:'atope.jpeg'};
    var est2 = {id: 2, name: 'Gym Noray', desc: 'Gimnasio muy acondicionado y en perfecto estado.',
        city: 'Santa Pola', province: 'Alicante', addr: 'Calle Falsa nº34',
        phone: '965662347', website: 'http://wwww.noraygym.com', main_img:'noray.jpeg'};
    var est3 = {id: 3, name: 'Más Sport', desc: 'Asociación deportiva con unas instalaciones increíbles.',
        city: 'Alicante', province: 'Alicante', addr: 'Calle Arco nº32',
        phone: '965663057', website: 'http://wwww.masport.es', main_img:'mas.jpeg'};
    var est4 = {id: 7, name: 'Montemar', desc: 'Especializados en cursos y clases de ténis.',
        city: 'Alicante', province: 'Alicante', addr: 'Avenida Novelda Km 14',
        phone: '965662268', website: 'http://wwww.montemar.es', main_img:'montemar.jpeg'};
    var est5 = {id: 22, name: 'Gimnasio 13', desc: 'El mejor lugar para ponerte en forma.',
        city: 'Alicante', province: 'Alicante', addr: 'Gran Vía nº15',
        phone: '965662257', website: 'http://wwww.13gym.es', main_img:'13gym.jpeg'};
    var rows = [est1,est2,est3,est4,est5];
    var data = {count: 5, rows: rows};
    // Set up the module
    beforeEach(module('justSport'));

    beforeEach(inject(function ($injector, establishmentFilteredService) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        homeService = establishmentFilteredService;
    }));

    it('Should fetch all the establishment filtered', function(){
        var establishments = {Establishments: data};
        $httpBackend.expectGET(baseAPI+'establishments/sport/1/location/Alicante').respond(establishments);
        var ests= [];
        homeService.getEstablishments(1, "Alicante").then(function(estabs){
            ests = estabs;
        });
        $httpBackend.flush();
        expect(ests.count).toBe(5);
        expect(ests).toEqual(data);
    });

    it('Should return empty array', function(){
        $httpBackend.expectGET(baseAPI+'establishments/sport/1/location/Madrid')
            .respond(404,{
                message: "There are no establishments that match the current filter"
            });
        var message;
        homeService.getEstablishments(1, "Madrid").then(function(data){
            message = data;
        });
        $httpBackend.flush();
        expect("There are no establishments that match the current filter").toBe(message);
    });
});