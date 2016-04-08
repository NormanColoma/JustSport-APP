describe('Service that fetch all the establishment filtered by location and sport', function() {
    var $httpBackend;
    var baseAPI = 'https://localhost:3000/api/';
    var client_id = "2xa001za-78b3-4f38-9376-e2dd88b7c682";
    var loginService;
    // Set up the module
    beforeEach(module('justSport'));

    beforeEach(inject(function ($injector, loginService) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        loginService = loginService;
    }));

    it('Should get admin token after successful log in', function(){
        var token = {access_token: "eyJ0", role: "admin", username: 'Norman', user_id: '8a74a3aa-757d-46f1-ba86-a56a0f107735'};
        $httpBackend.expectGET(baseAPI+'/oauth2/token').respond(token);
        var tkn= null;
        var email = "ua.norman@gmail.com";
        var password = "12314";
        loginService.getToken(email,password).then(function(data){
            tkn = data;
        });
        $httpBackend.flush();
        expect(tkn).toEqual(tk);
    });

    it('Should return invalid credentials', function(){
        $httpBackend.expectGET(baseAPI+'/oauth2/token').respond(403, {
            error: "invalid_grant",
            error_description: "Invalid resource owner credentials"
        });
        var error= null;
        var email = "ua.norman@gmail.com";
        var password = "12314";
        loginService.getToken(email,password).then(function(data){
            error = data.error;
        });
        $httpBackend.flush();
        expect(error).toEqual("invalid_grant");
    });
});