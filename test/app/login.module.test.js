/**
 * Created by Norman on 14/04/2016.
 */
angular
    .module('justSportTest')
    .run(loginTest);

    loginTest.$inject = ['$httpBackend'];

    function loginTest($httpBackend) {
        var local_api = "https://localhost:3000";
        var token = {access_token: "eyJ0", role: "owner", username: 'Pepe', expires: 1460805614894, user_id:"1234-567"};
        var error = {error: 'Faking error'};
        $httpBackend.whenPOST(local_api + '/api/oauth2/token').respond(function(method, url, data) {
            var user = angular.fromJson(data);
            if(user.username === "pepe@gmail.com"){
                return [200,token, {}];
            }
            return [401, error, {}];
        });
        $httpBackend.whenPOST('https://localhost:5000/token/eyJ0').passThrough();
        $httpBackend.whenPOST('http://localhost:5000/token/eyJ0').passThrough();

        $httpBackend.whenDELETE('https://localhost:5000/token').passThrough();
        $httpBackend.whenDELETE('http://localhost:5000/token').passThrough();
    }