/**
 * Created by Norman on 01/06/2016.
 */
angular
    .module('justSportTest')
    .run(backOfficeAddEstTest);

    backOfficeAddEstTest.$inject = ['$httpBackend'];

    function backOfficeAddEstTest($httpBackend) {
        var local_api = "https://localhost:3000";

        $httpBackend.whenGET('app/backoffice-estabs/back-office-add-est.html').passThrough();
        $httpBackend.whenGET('app/backoffice/computer-tabs.html').passThrough();
        $httpBackend.whenGET('app/backoffice/mobile-tabs.html').passThrough();
        $httpBackend.whenGET('./public/images/icons/profile.svg').passThrough();
        $httpBackend.whenGET('./public/images/icons/panel.svg').passThrough();
        $httpBackend.whenGET('./public/images/icons/logout.svg').passThrough();
        $httpBackend.whenGET('app/backoffice-schedule/add-schedule.html').passThrough();
        $httpBackend.whenGET('app/backoffice-estabs/add-est-mobile.html').passThrough();
        $httpBackend.whenGET('app/backoffice-estabs/update-est-mobile.html').passThrough();
        $httpBackend.whenPOST(local_api+'/api/establishments/new').respond(201);
        $httpBackend.whenDELETE(local_api+'/api/establishments/1').respond(204);
    }