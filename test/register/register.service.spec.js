/**
 * Created by Norman on 17/04/2016.
 */
describe('Login Controller', function() {
    var $httpBackend;
    var baseAPI = 'https://localhost:3000/api/';
    var rService;
    // Set up the module
    beforeEach(module('justSport'));

    beforeEach(inject(function ($injector, registerService) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        rService = registerService;
    }));

    it('Should register the user correctly', function(){
        var user = {
            name:"Pepe", lname:"Cano Gómez", email:"llca@gmail.com", pass:"lcano2102",
            gender:"male", role:"owner"
        }
        $httpBackend.expectPOST(baseAPI+'users').respond(user);
        var registeredUser = null;
        lService.registerUser(user).then(function(data){
            registeredUser = data;
        });
        $httpBackend.flush();
        expect(registeredUser).toEqual(true);
    });

    it('Should not register the user when its already exists', function(){
        var user = {
            name:"Pepe", lname:"Cano Gómez", email:"llca@gmail.com", pass:"lcano2102",
            gender:"male", role:"owner"
        }
        var message = null;
        var error = {
            errors: [
                {
                    type: "Duplicated entry",
                    field: "email",
                    message: "The value: 'llca@gmail.com' is already taken"
                }
            ]
        }
        $httpBackend.expectPOST(baseAPI+'users').respond(user);
        lService.registerUser(user).then(function(data){
            message = data;
        });
        $httpBackend.flush();
        expect(registeredUser).toEqual("The value: 'llca@gmail.com' is already taken");
    });
});