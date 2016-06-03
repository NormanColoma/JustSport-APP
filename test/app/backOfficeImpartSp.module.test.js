/**
 * Created by Norman on 03/06/2016.
 */
angular
    .module('justSportTest')
    .run(backOfficeImpartSp);

backOfficeImpartSp.$inject = ['$httpBackend'];

function backOfficeImpartSp($httpBackend) {
    var local_api = "https://localhost:3000";
    var rows = [{name: 'Spinning'},{name: 'Zumba'}];
    var csports = {Sports: {rows: rows}};
    var sp = {name: 'CrosFit'};
    $httpBackend.whenGET('app/backoffice-estabs/impart-sport.html').passThrough();
    $httpBackend.whenGET(local_api+"/api/establishments/1/sports?limit=200").respond(csports);
    $httpBackend.whenPUT(local_api+"/api/establishments/1/sports/new").respond(sp);
}