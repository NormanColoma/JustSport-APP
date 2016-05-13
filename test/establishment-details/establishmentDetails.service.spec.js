/**
 * Created by Norman on 11/05/2016.
 */
describe('Establishment Details Service that retrieves full establishment', function() {
    var $httpBackend;
    var baseAPI = 'https://localhost:3000/api/';
    var estService;
    // Set up the module
    beforeEach(module('justSport'));

    beforeEach(inject(function ($injector, establishmentDetailsService) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        estService = establishmentDetailsService;
    }));

    it('Should return the full establishment when passsing its id',function(){
        var estab = {id: 1,name: "Nombre Gym", desc: "Esta es la desc",city: "Alicante",
        province: "Alicante", addr: "Esta es la dirección", phone: "965660427", website: "www.pagina.com",
        main_img:"default.jpg", Votes:[{user: "8a74a3aa-757d-46f1-ba86-a56a0f107735"}],
        Commentaries:[{id: 1,
            text: "El gimnasio tiene unas instalaciones increíbles",
            createdAt: "2016-05-11T09:02:45.000Z"}], Courses:[{id: 1, instructor: "Juan Domínguez",
                price: 17.5, info: "Un curso muy completo", Sport: {"name": "Spinning"}
            }]
        };
        var est = null;
        $httpBackend.expectGET(baseAPI+'establishments/1').respond(estab);
        estService.getEstablishment(1).then(function(data){
            est = data;
        });
        $httpBackend.flush();
        var expc_est = {Establishment:{id: 1,name: "Nombre Gym", desc: "Esta es la desc",city: "Alicante",
            province: "Alicante", addr: "Esta es la dirección", phone: "965660427", website: "www.pagina.com",
            main_img:"default.jpg"}, Votes:estab.Votes.length,
            Commentaries:[{id: 1,
                text: "El gimnasio tiene unas instalaciones increíbles",
                createdAt: "2016-05-11T09:02:45.000Z"}],Courses:[{id: 1, instructor: "Juan Domínguez",
                price: 17.5, info: "Un curso muy completo", Sport: {"name": "Spinning"}
            }]
        };
        expect(est).toEqual(expc_est);
    });

    it('Should return error message',function(){
        var message = {
            message: "There was an error when loading establishment"
        };
        var m = null;
        $httpBackend.expectGET(baseAPI+'establishments/1').respond(500,message);
        estService.getEstablishment(1).then(function(data){
            m = data;
        });
        $httpBackend.flush();

        expect(message).toEqual(m);
    });

    it('Should return true when voting',function(){
        $httpBackend.expectPOST(baseAPI+'establishments/1/votes/new').respond(201);
        var result = false;
        estService.vote(1).then(function(data){
            result = data;
        });
        $httpBackend.flush();
        expect(result).toBeTruthy();
    });

    it('Should return false when voting',function(){
        $httpBackend.expectPOST(baseAPI+'establishments/1/votes/new').respond(500);
        var result = true;
        estService.vote(1).then(function(data){
            result = data;
        });
        $httpBackend.flush();
        expect(result).toBeFalsy();
    });

    it('Should add new commentary succesfully', function(){
        var comm = {Commentary: {id: 5, text: "El ambiente del gimnasio es increíble", "createdAt": "2016-05-12T22:53:31.433Z",
            User: {
                name: "Norman",
                img: "default.jpg"
            }}};
        $httpBackend.expectPOST(baseAPI+'establishments/1/commentaries/new').respond(201, comm);
        var text = "Este es el commentario";
        var commentary = null;
        estService.addComm(1,text).then(function(data){
            commentary = data;
        });
        var expected_comm = {id: 5, text: "El ambiente del gimnasio es increíble", "createdAt": "2016-05-12T22:53:31.433Z",
            User: {
                name: "Norman",
                img: "default.jpg"
            }};
        $httpBackend.flush();
        expect(commentary).toEqual(expected_comm);
    });

    it('Should failed when trying to add new commentary', function(){
        var text = {message: "Something failed"};
        $httpBackend.expectPOST(baseAPI+'establishments/1/commentaries/new').respond(500, text);
        var text_r = null;
        estService.addComm(1,"Pepe").then(function(data){
            text_r = data;
        });
        $httpBackend.flush();
        expect(text_r).toEqual(text);
    });
});