/**
 * Created by Norman on 08/06/2016.
 */
angular
    .module('justSportTest')
    .run(backOfficeCourses);

backOfficeCourses.$inject = ['$httpBackend'];

function backOfficeCourses($httpBackend) {
    var local_api = "https://localhost:3000";
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
                        },
                        {
                            "id": 2,
                            "info": "Un curso no tan completo",
                            "price": 20,
                            "instructor": "Pepe Castaño",
                        },
                        {
                            "id": 3,
                            "info": "Un curso poco completo",
                            "price": 15,
                            "instructor": "María Castro",
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
    $httpBackend.whenGET('app/backoffice-courses/list-courses.html').passThrough();
    $httpBackend.whenGET(local_api+"/api/establishments/me/all?limit=200").respond(200,data);
    $httpBackend.whenPUT(local_api+"/api/courses/2").respond(204);
    $httpBackend.whenGET('app/backoffice-courses/update-course.html').passThrough();
    $httpBackend.whenDELETE(local_api+"/api/courses/2").respond(204);
    $httpBackend.whenPOST(local_api+"/api/courses/new").respond(201);
    $httpBackend.whenGET('app/backoffice-courses/add-course.html').passThrough();
}