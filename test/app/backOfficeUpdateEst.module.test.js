/**
 * Created by Norman on 05/06/2016.
 */
angular
    .module('justSportTest')
    .run(backOfficeUpdateEst);

    backOfficeUpdateEst.$inject = ['$httpBackend'];

    function backOfficeUpdateEst($httpBackend) {
        var local_api = "https://localhost:3000";
        $httpBackend.whenGET('app/backoffice-estabs/update-estab.html').passThrough();
        $httpBackend.whenPUT(local_api+"/api/establishments/1").respond(204);
    }