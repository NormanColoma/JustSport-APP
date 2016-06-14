/**
 * Created by Norman on 06/04/2016.
 */
angular
    .module('justSportTest')
    .run(estabsFilteredTest);

estabsFilteredTest.$inject = ['$httpBackend'];

function estabsFilteredTest($httpBackend) {
    /**
     *
     * Mocking no establishment found
     */
    var local_api = "https://justsport-api.herokuapp.com/api/";
    var message_1 = {
        message: "There are no establishments that match the current filter"
    };
    $httpBackend.whenGET(local_api + '/establishments/sport/1/location/Valencia?limit=5').respond(404,message_1);

    /**
     *
     * Mocking establishments found
     */
    var est1 = {id: 1,name: 'Gym A Tope', desc: 'Gimnasio perfecto para realizar tus actividades deportivas.',
        city: 'San Vicente del Raspeig', province: 'Alicante', addr: 'Calle San Franciso nº15',
        phone: '965660327', website: 'http://wwww.gymatope.es', main_img:'default.jpg'};
    var est2 = {id: 2,name: 'Gym Noray', desc: 'Gimnasio muy acondicionado y en perfecto estado.',
        city: 'Santa Pola', province: 'Alicante', addr: 'Calle Falsa nº34',
        phone: '965662347', website: 'http://wwww.noraygym.com', main_img:'default.jpg'};
    var est3 = {id: 4, name: 'Montemar', desc: 'Especializados en cursos y clases de ténis.',
        city: 'Alicante', province: 'Alicante', addr: 'Avenida Novelda Km 14',
        phone: '965662268', website: 'http://wwww.montemar.es', main_img:'default.jpg'};
    var data = {count: 3, rows: [est1,est2,est3]};
    var cursor = {before: 0, after: 0};
    var paging= {cursors: cursor, previous: 'none', next: 'none'};
    var estabs = {Establishments: data, paging: paging};

    $httpBackend.whenGET(local_api + '/establishments/sport/1/location/Alicante?limit=5').respond(estabs);


    /**
     * Mocking directives
     */
    $httpBackend.whenGET('app/home/est-results.html').passThrough();
}