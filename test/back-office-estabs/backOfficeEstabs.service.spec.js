/**
 * Created by Norman on 22/05/2016.
 */
fdescribe('Back Office Estab Service that handles establishments', function() {
    var $httpBackend;
    var baseAPI = 'https://localhost:3000/api/';
    var backOEstService;
    var data ={
        "Establishments": {
            "count": 5,
            "rows": [
                {
                    "id": 1,
                    "name": "Gym A Tope",
                    "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                    "city": "San Vicente del Raspeig",
                    "province": "Alicante",
                    "addr": "Calle San Franciso nº15",
                    "phone": "965660327",
                    "website": "http://wwww.gymatope.es",
                    "main_img": "default.jpg",
                    "Courses": [
                        {
                            "id": 1,
                            "info": "Un curso muy completo",
                            "price": 17.5,
                            "instructor": "Juan Domínguez",
                            "Schedule": [
                                {
                                    "id": 1,
                                    "day": "Martes",
                                    "startTime": "10:00",
                                    "endTime": "11:00"
                                },
                                {
                                    "id": 2,
                                    "day": "Lunes",
                                    "startTime": "11:00",
                                    "endTime": "12:00"
                                },
                                {
                                    "id": 3,
                                    "day": "Miércoles",
                                    "startTime": "17:00",
                                    "endTime": "18:00"
                                },
                                {
                                    "id": 4,
                                    "day": "Jueves",
                                    "startTime": "12:00",
                                    "endTime": "13:00"
                                },
                                {
                                    "id": 5,
                                    "day": "Jueves",
                                    "startTime": "20:00",
                                    "endTime": "21:00"
                                },
                                {
                                    "id": 6,
                                    "day": "Viernes",
                                    "startTime": "09:00",
                                    "endTime": "10:00"
                                }
                            ]
                        },
                        {
                            "id": 2,
                            "info": "Un curso no tan completo",
                            "price": 20,
                            "instructor": "Pepe Castaño",
                            "Schedule": [
                                {
                                    "id": 7,
                                    "day": "Jueves",
                                    "startTime": "12:30",
                                    "endTime": "13:30"
                                },
                                {
                                    "id": 8,
                                    "day": "Jueves",
                                    "startTime": "20:00",
                                    "endTime": "21:00"
                                },
                                {
                                    "id": 9,
                                    "day": "Viernes",
                                    "startTime": "10:00",
                                    "endTime": "11:00"
                                }
                            ]
                        },
                        {
                            "id": 3,
                            "info": "Un curso poco completo",
                            "price": 15,
                            "instructor": "María Castro",
                            "Schedule": []
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "Gym Noray",
                    "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                    "city": "Santa Pola",
                    "province": "Alicante",
                    "addr": "Calle Falsa nº34",
                    "phone": "965662347",
                    "website": "http://wwww.noraygym.com",
                    "main_img": "default.jpg",
                    "Courses": [
                        {
                            "id": 4,
                            "info": "Megacompleto",
                            "price": 17.5,
                            "instructor": "Carlos Díaz",
                            "Schedule": []
                        }
                    ]
                },
                {
                    "id": 4,
                    "name": "Montemar",
                    "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                    "city": "Alicante",
                    "province": "Alicante",
                    "addr": "Avenida Novelda Km 14",
                    "phone": "965662268",
                    "website": "http://wwww.montemar.es",
                    "main_img": "default.jpg",
                    "Courses": [
                        {
                            "id": 5,
                            "info": "Para profesionales",
                            "price": 30,
                            "instructor": "Ruben Pérez",
                            "Schedule": []
                        }
                    ]
                },
                {
                    "id": 3,
                    "name": "Más Sport",
                    "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                    "city": "Valencia",
                    "province": "Valencia",
                    "addr": "Calle Arco nº32",
                    "phone": "965663057",
                    "website": "http://wwww.masport.es",
                    "main_img": "crossfit.jpg",
                    "Courses": []
                },
            ]
        },
        "paging": {
            "cursors": {
                "before": 0,
                "after": 0
            },
            "previous": "none",
            "next": "none"
        }
    };
    // Set up the module
    beforeEach(module('justSport'));

    beforeEach(inject(function ($injector, backOfficeEstabService) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        backOEstService = backOfficeEstabService;
    }));

    it('Should retrieve the establishment that belongs to the user', function () {
        $httpBackend.expectGET(baseAPI+'establishments/me/all?limit=3').respond(data);
        var real = null;
        backOEstService.getEstabs("none").then(function(data){
            real = data;
        });
        var expected_data = {Establishments: [{
            id: 1, name: "Gym A Tope",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor " +
            "incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, " +
            "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo con" +
            "sequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum" +
            " dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, su" +
            "nt in culpa qui officia deserunt mollit anim id est laborum",
            city: "San Vicente del Raspeig", province: "Alicante", addr: "Calle San Franciso nº15", phone: "965660327",
            website: "http://wwww.gymatope.es", main_img: "default.jpg",
        },{
            id: 2, name: "Gym Noray",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
            city: "Santa Pola", province: "Alicante", addr: "Calle Falsa nº34", phone: "965662347", website: "http://wwww.noraygym.com",
            main_img: "default.jpg",
        },{
            "id": 4, "name": "Montemar",
            "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
            "city": "Alicante", "province": "Alicante", "addr": "Avenida Novelda Km 14", "phone": "965662268",
            "website": "http://wwww.montemar.es", "main_img": "default.jpg",
        },{
            "id": 3, "name": "Más Sport",
            "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
            "city": "Valencia", "province": "Valencia", "addr": "Calle Arco nº32", "phone": "965663057", "website": "http://wwww.masport.es",
            "main_img": "crossfit.jpg",
        }], paging: data.paging};
        $httpBackend.flush();
        expect(expected_data).toEqual(real);
    });

    it('Should post the establishment correctly', function(){
        var expected_data = {id: 1, name: "Gym A Tope", desc: "descripción del establecimiento", city: "San Vicente del Raspeig",
            province: "Alicante", addr: "Calle San Franciso nº15", phone: "965660327", website: "http://wwww.gymatope.es",
            main_img: "default.jpg"};
        var post_data = {
            name: "Gym A Tope", desc: "descripción del establecimiento", city: "San Vicente del Raspeig",
            province: "Alicante", addr: "Calle San Franciso nº15", phone: "965660327", website: "http://wwww.gymatope.es",
            main_img: "default.jpg"
        };
        $httpBackend.expectPOST(baseAPI+'establishments/new').respond(201,expected_data);
        var real = null;
        backOEstService.addEstablishment(post_data).then(function(data){
            real = data;
        });
        $httpBackend.flush();
        expect(expected_data).toEqual(real);
    });

    it('Should not post the establishment correctly', function(){
        var expected_data = {message: "An error occurred when posting establishment"};
        $httpBackend.expectPOST(baseAPI+'establishments/new').respond(500,expected_data);
        var real = null;
        backOEstService.addEstablishment(expected_data).then(function(data){
            real = data;
        });
        $httpBackend.flush();
        expect(expected_data).toEqual(real);
    });

    fit('Should delete the establishment correctly', function(){
        $httpBackend.expectPOST(baseAPI+'establishments/1').respond(204);
        var real = null;
        backOEstService.deleteEstablishment(1).then(function(data){
            real = data;
        });
        $httpBackend.flush();
        expect(real).toBeTruthy();
    });

    fit('Should not delete the establishment', function(){
        $httpBackend.expectPOST(baseAPI+'establishments/1').respond(500);
        var real = null;
        backOEstService.deleteEstablishment(1).then(function(data){
            real = data;
        });
        $httpBackend.flush();
        expect(real).toBeFalsy();
    });
});