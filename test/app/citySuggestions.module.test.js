/**
 * Created by Norman on 06/04/2016.
 */
angular
    .module('justSportTest')
    .run(testApp);

testApp.$inject = ['$httpBackend'];

function testApp($httpBackend) {
    var local_api = "https://localhost:3000/api";
    var cities = {
        locations: ['Alicante']
    };
    var cities2 = {
        locations: ['Valencia']
    }
    $httpBackend.whenGET(local_api + '/establishments/Valencia/suggestions').respond(cities2);
    $httpBackend.whenGET(local_api + '/establishments/Alicante/suggestions').respond(cities);
}