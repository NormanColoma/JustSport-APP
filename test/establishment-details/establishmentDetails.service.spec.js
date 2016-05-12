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
            createdAt: "2016-05-11T09:02:45.000Z"}]
        };
        var est = null;
        $httpBackend.expectGET(baseAPI+'establishments/1').respond(estab);
        estService.getEstablishment(1).then(function(data){
            est = data;
        });
        $httpBackend.flush();
        var expc_est = {Establishment:{id: 1,name: "Nombre Gym", desc: "Esta es la desc",city: "Alicante",
            province: "Alicante", addr: "Esta es la dirección", phone: "965660427", website: "www.pagina.com",
            main_img:"default.jpg"}, Votes:[{user: "8a74a3aa-757d-46f1-ba86-a56a0f107735"}],
            Commentaries:[{id: 1,
                text: "El gimnasio tiene unas instalaciones increíbles",
                createdAt: "2016-05-11T09:02:45.000Z"}]
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
});