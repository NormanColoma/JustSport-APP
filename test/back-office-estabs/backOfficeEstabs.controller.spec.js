/**
 * Created by Norman on 22/05/2016.
 */
describe('Back Office Estab Controller', function() {
    var $httpBackend, $rootScope, createController;
    var baseAPI = 'https://justsport-api.herokuapp.com/api/';

    // Set up the module
    beforeEach(module('justSport'));

    beforeEach(inject(function ($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        // Get hold of a scope (i.e. the root scope)
        $rootScope = $injector.get('$rootScope');
        // The $controller service is used to create instances of controllers
        var $controller = $injector.get('$controller');

        createController = function () {
            return $controller('BackOfficeEstabController', {'$scope': $rootScope});
        };
    }));

    var data_2 = {
        "Establishments": {
            "count": 5,
            "rows": [
                {
                    "id": 7,
                    "name": "Gym Pepe",
                    "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                    "city": "San Vicente del Raspeig",
                    "province": "Alicante",
                    "addr": "Calle San Franciso nº15",
                    "phone": "965660427",
                    "website": "http://wwww.gymatope.es",
                    "main_img": "default.jpg",
                    "Courses": []
                },
                {
                    "id": 10,
                    "name": "Gym Pepinoo",
                    "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                    "city": "Santa Pola",
                    "province": "Alicante",
                    "addr": "Calle Falsa nº34",
                    "phone": "965665347",
                    "website": "http://wwww.noraygym.com",
                    "main_img": "default.jpg",
                    "Courses": []
                }
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
                "after": 'MQ'
            },
            "previous": "none",
            "next": "none"
        }
    };

    it('Should fetch all the establishment that belongs to the owner', function(){
        var controller = createController();
        localStorage.setItem('username','Norman');
        $httpBackend.expectGET(baseAPI+'establishments/me/all?limit=3').respond(data);
        expect(controller.estabs).toEqual([]);
        expect(controller.after).toEqual("none");
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
        }]};
        /* jshint ignore:start*/
        controller.getEstabs();
        /*jshint ignore:end */
        $httpBackend.flush();
        expect(controller.estabs).toEqual(expected_data.Establishments);
        expect(controller.after).toEqual("MQ");
    });

    it('Should add the new establishments to the collection', function(){
        var controller = createController();
        $httpBackend.expectGET(baseAPI+'establishments/me/all?limit=3').respond(data);
        expect(controller.estabs).toEqual([]);
        expect(controller.after).toEqual("none");
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
        }]};
        /* jshint ignore:start*/
        controller.getEstabs();
        /*jshint ignore:end */
        $httpBackend.flush();
        expect(controller.estabs).toEqual(expected_data.Establishments);
        expect(controller.after).toEqual("MQ");
        expect(controller.estabs.length).toEqual(4);
        expected_data.Establishments.push(
            { "id": 7,
                "name": "Gym Pepe",
                "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                "city": "San Vicente del Raspeig",
                "province": "Alicante",
                "addr": "Calle San Franciso nº15",
                "phone": "965660427",
                "website": "http://wwww.gymatope.es",
                "main_img": "default.jpg"
            },
            {
                "id": 10,
                "name": "Gym Pepinoo",
                "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                "city": "Santa Pola",
                "province": "Alicante",
                "addr": "Calle Falsa nº34",
                "phone": "965665347",
                "website": "http://wwww.noraygym.com",
                "main_img": "default.jpg"
            }
        );
        $httpBackend.expectGET(baseAPI+'establishments/me/all?after=MQ&limit=3').respond(data_2);
        /* jshint ignore:start*/
        controller.getEstabs();
        /*jshint ignore:end */
        $httpBackend.flush();
        expect(controller.estabs.length).toEqual(6);
        expect(controller.estabs).toEqual(expected_data.Establishments);
        expect(controller.after).toEqual(0);
    });

    it('Should post the new establishment', function(){
        var controller = createController();
        var expected_data = {id: 1, name: "Gym A Tope", desc: "descripción del establecimiento", city: "San Vicente del Raspeig",
            province: "Alicante", addr: "Calle San Franciso nº15", phone: "965660327", website: "http://wwww.gymatope.es",
            main_img: "default.jpg"};
        $httpBackend.expectPOST(baseAPI+'establishments/new').respond(201,expected_data);
        var post_data = {
            name: "Gym A Tope", desc: "descripción del establecimiento", city: "San Vicente del Raspeig",
            province: "Alicante", addr: "Calle San Franciso nº15", phone: "965660327", website: "http://wwww.gymatope.es",
            main_img: "default.jpg"
        };
        expect(controller.estabs).toEqual([]);
        controller.estab = post_data;
        /* jshint ignore:start*/
        controller.addEstablishment(post_data,undefined);
        /*jshint ignore:end */
        $httpBackend.flush();
        expect(controller.estabs[0]).toEqual(expected_data);
        localStorage.removeItem('username');
    });

    it('Should associate the sports to the establishment correctly', function(){
        var controller = createController();
        $httpBackend.expectPUT(baseAPI+'establishments/1/sports/new').respond(204);
        $httpBackend.expectPUT(baseAPI+'establishments/1/sports/new').respond(204);
        $httpBackend.expectPUT(baseAPI+'establishments/1/sports/new').respond(204);
        var array = [
            {id: 1, name: "Spinning"},
            {id: 2, name: "Corssfit"},
            {id: 3, name: "Zumna"}
        ];
        var expected = [
            {id: 1, name: "Spinning"},
            {id: 2, name: "Corssfit"},
            {id: 3, name: "Zumna"}
        ];
        /* jshint ignore:start*/
        controller.associateSport(1,array);
        /*jshint ignore:end */
        $httpBackend.flush();
        expect(controller.sports).toEqual(expected);
    });

});