/**
 * Created by Norman on 18/05/2016.
 */
describe('User Account Service that handles user operations', function() {
    var $httpBackend;
    var baseAPI = 'https://localhost:3000/api/';
    var userService;
    // Set up the module
    beforeEach(module('justSport'));

    beforeEach(inject(function ($injector, userAccountService) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        userService = userAccountService;
    }));

    it('Should return the info about user', function () {
        var user = {uuid: "8a74a3aa-757d-46f1-ba86-a56a0f107735", name: "Norman", lname: "Coloma García",
            email: "ua.norman@gmail.com", gender: "male", role: "admin", img: "default.jpg"
        };
        $httpBackend.expectGET(baseAPI+'users/8a74a3aa-757d-46f1-ba86-a56a0f107735').respond(user);
        var real_user = null;
        userService.getUser('8a74a3aa-757d-46f1-ba86-a56a0f107735').then(function (user) {
            real_user = user;
        });
        $httpBackend.flush();
        var expected_user = {name: "Norman", lname: "Coloma García", role: "admin", gender:'male',img: "default.jpg"};
        expect(expected_user).toEqual(real_user);
    });

    it('Should return error message when trying to retrieve user info', function () {
        var message = {message: "An error occurred"};
        $httpBackend.expectGET(baseAPI+'users/8a74a3aa-757d-46f1-ba86-a56a0f107735').respond(500);
        var real = null;
        userService.getUser('8a74a3aa-757d-46f1-ba86-a56a0f107735').then(function (data) {
            real = data;
        });
        $httpBackend.flush();
        expect(real).toEqual(message);
    });

    it('Should close the user account correctly', function(){
        $httpBackend.expectDELETE(baseAPI+'users/8a74a3aa-757d-46f1-ba86-a56a0f107735').respond(204);
        var res= false;
        userService.closeAccount('8a74a3aa-757d-46f1-ba86-a56a0f107735').then(function(result){
            res = result;
        });
        $httpBackend.flush();
        expect(res).toBeTruthy();
    });

    it('Should not close the user account correctly', function(){
        $httpBackend.expectDELETE(baseAPI+'users/8a74a3aa-757d-46f1-ba86-a56a0f107735').respond(500);
        var res= false;
        userService.closeAccount('8a74a3aa-757d-46f1-ba86-a56a0f107735').then(function(result){
            res = result;
        });
        $httpBackend.flush();
        expect(res).toBeFalsy();
    });

    it('Should update the user account correctly', function(){
        $httpBackend.expectPUT(baseAPI+'users/8a74a3aa-757d-46f1-ba86-a56a0f107735').respond(204);
        var data = {pass: "nuevo2015", role: "user", gender: "female"};
        var res= false;
        userService.updateAccount('8a74a3aa-757d-46f1-ba86-a56a0f107735', data).then(function(result){
            res = result;
        });
        $httpBackend.flush();
        expect(res).toBeTruthy();
    });

    it('Should not update the user account correctly', function(){
        $httpBackend.expectPUT(baseAPI+'users/8a74a3aa-757d-46f1-ba86-a56a0f107735').respond(500);
        var data = {pass: "nuevo2015", role: "user", gender: "female"};
        var res= false;
        userService.updateAccount('8a74a3aa-757d-46f1-ba86-a56a0f107735', data).then(function(result){
            res = result;
        });
        $httpBackend.flush();
        expect(res).toBeFalsy();
    });
});