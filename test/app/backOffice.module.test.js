/**
 * Created by Norman on 22/05/2016.
 */
angular
    .module('justSportTest')
    .run(backOfficeTest);

    backOfficeTest.$inject = ['$httpBackend'];

    function backOfficeTest($httpBackend) {
        var local_api = "https://localhost:3000";

        $httpBackend.whenGET('public/images/icons/add.svg').passThrough();
        $httpBackend.whenGET('public/images/icons/add_photo.svg').passThrough();
        $httpBackend.whenGET('public/images/icons/delete.svg').passThrough();
        $httpBackend.whenGET('app/backoffice/back-office-tabs.html').passThrough();
    }
