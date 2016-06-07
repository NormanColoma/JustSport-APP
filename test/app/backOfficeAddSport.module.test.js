/**
 * Created by Norman on 07/06/2016.
 */
angular
    .module('justSportTest')
    .run(backOfficeAddSportTest);

    backOfficeAddSportTest.$inject = ['$httpBackend'];

    function backOfficeAddSportTest($httpBackend) {
        var local_api = "https://localhost:3000";

        var err = {
            errors: [
                {
                    type: "Duplicated entry",
                    field: "name",
                    message: "The value: 'Spinning' is already taken"
                }
            ]
        };
        $httpBackend.whenGET('app/backoffice-sports/add-sport.html').passThrough();
        $httpBackend.whenPOST(local_api + '/api/sports/new').respond(function(method, url, data) {
            var sp = angular.fromJson(data);
            if(sp.name === "Natación"){
                return [201];
            }
            return [500, err,{}];
        });
    }