/**
 * Created by Norman on 19/04/2016.
 */
angular
    .module('justSportTest')
    .run(registerTest);

    registerTest.$inject = ['$httpBackend'];

    function registerTest($httpBackend){
        var local_api = "https://localhost:3000";
        var error = {
            errors: [
                {
                    type: "Duplicated entry",
                    field: "email",
                    message: "The value: 'pepe@gmail.com' is already taken"
                }
            ]
        }
        $httpBackend.whenPOST(local_api + '/api/users/new').respond(function(method, url, data) {
            var user = angular.fromJson(data);
            if(user.email === "pepe@gmail.com"){
                return [500,error, {}];
            }
            return [201];
        });
    }