describe('Service that manages the login', function() {
    var $httpBackend;
    var baseAPI = 'https://justsport-api.herokuapp.com/api/';
    var client_id = "2xa001za-78b3-4f38-9376-e2dd88b7c682";
    var lService;
    // Set up the module
    beforeEach(module('justSport'));

    beforeEach(inject(function ($injector, loginService) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        lService = loginService;
    }));

    it('Should get admin token after successful log in', function(){
        var token = {access_token: "eyJ0", role: "admin", username: 'Norman', user_id: '8a74a3aa-757d-46f1-ba86-a56a0f107735'};
        $httpBackend.expectPOST(baseAPI+'oauth2/token').respond(token);
        var tkn= null;
        var email = "ua.norman@gmail.com";
        var password = "12314";
        lService.getToken(email,password).then(function(data){
            tkn = data;
        });
        $httpBackend.flush();
        expect(tkn).toEqual(token);
    });

    it('Should return invalid credentials', function(){
        $httpBackend.expectPOST(baseAPI+'oauth2/token').respond(403, {
            error: "invalid_grant",
            error_description: "Invalid resource owner credentials"
        });
        var error= null;
        var email = "ua.norman@gmail.com";
        var password = "12314";
        lService.getToken(email,password).then(function(data){
            error = data.error;
        });
        $httpBackend.flush();
        expect(error).toEqual("invalid_grant");
    });
});