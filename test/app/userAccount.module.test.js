/**
 * Created by Norman on 21/05/2016.
 */
angular
    .module('justSportTest')
    .run(accountTest);

accountTest.$inject = ['$httpBackend'];

function accountTest($httpBackend) {
    var local_api = "https://localhost:3000";
    var user = {uuid: "1234-567", name: "Pepe", lname: "Gómez Sánchez",
        email: "ua.norman@gmail.com", gender: "male", role: "user", img: "default.jpg"
    };
    $httpBackend.whenGET(local_api+"/api/users/1234-567").respond(200,user);
    $httpBackend.whenPUT(local_api+"/api/users/1234-567").respond(204);
}