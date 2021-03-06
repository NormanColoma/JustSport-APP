/**
 * Created by Norman on 17/04/2016.
 */
describe('Login Controller', function() {
    var $httpBackend;
    var baseAPI = 'https://justsport-api.herokuapp.com/api/';
    var rService;
    // Set up the module
    beforeEach(module('justSport'));

    beforeEach(inject(function ($injector, registerUserService) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        rService = registerUserService;
    }));

    it('Should register the user correctly', function(){
        var user = {
            name:"Pepe", lname:"Cano Gómez", email:"llca@gmail.com", pass:"lcano2102",
            gender:"male", role:"owner"
        };
        $httpBackend.expectPOST(baseAPI+'users/new').respond(user);
        var registeredUser = null;
        rService.registerUser(user).then(function(data){
            registeredUser = data;
        });
        $httpBackend.flush();
        expect(registeredUser).toEqual(true);
    });

    it('Should not register the user when its already exists', function(){
        var user = {
            name:"Pepe", lname:"Cano Gómez", email:"llca@gmail.com", pass:"lcano2102",
            gender:"male", role:"owner"
        };
        var message = null;
        var error = {
            errors: [
                {
                    type: "Duplicated entry",
                    field: "email",
                    message: "The value: 'llca@gmail.com' is already taken"
                }
            ]
        };
        $httpBackend.expectPOST(baseAPI+'users/new').respond(500,error);
        rService.registerUser(user).then(function(data){
            message = data;
        });
        $httpBackend.flush();
        expect(message).toEqual("The value: 'llca@gmail.com' is already taken");
    });
});