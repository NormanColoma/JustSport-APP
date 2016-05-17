/**
 * Created by Norman on 17/05/2016.
 */

angular
    .module('justSportTest')
    .run(estabDetailsTest);

    estabDetailsTest.$inject = ['$httpBackend'];

    function estabDetailsTest($httpBackend){
        var estab = {id: 1,name: "Nombre Gym", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod " +
        "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation " +
        "ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate " +
        "velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa " +
        "qui officia deserunt mollit anim id est laborum",city: "Alicante", province: "Alicante", addr: "Esta es la dirección",
            phone: "965660427", website: "www.pagina.com", main_img:"default.jpg",
            Votes:[{user: "8a74a3aa-757d-46f1-ba86-a56a0f107735"}],
            Commentaries:[{
                "id": 5,
                "text": "El ambiente del gimnasio es increíble",
                "createdAt": "2016-05-12T22:10:43.000Z",
                "User": {
                    "name": "Norman",
                    "lname": "Coloma García",
                    "img": "default.jpg"
                }
            },
                {
                    "id": 6,
                    "text": "El ambiente del gimnasio es increíble. Los monitores son muy profesionales y te ayudan en todo momento.",
                    "createdAt": "2016-05-12T22:24:49.000Z",
                    "User": {
                        "name": "Norman",
                        "lname": "Coloma García",
                        "img": "default.jpg"
                    }
                }],
            Courses:[{
                    "id": 1,
                    "instructor": "Carlos Díaz",
                    "price": 17.5,
                    "info": "Megacompleto",
                    "Sport": {
                        "name": "Spinning"
                    }
            }]
        };
        var estab2 = {id: 2,name: "Nombre Gym", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod " +
        "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation " +
        "ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate " +
        "velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa " +
        "qui officia deserunt mollit anim id est laborum",city: "Alicante", province: "Alicante", addr: "Esta es la dirección",
            phone: "965660427", website: "www.pagina.com", main_img:"default.jpg",
            Votes:[],
            Commentaries:[],
            Courses:[{
                "id": 4,
                "instructor": "Carlos Díaz",
                "price": 17.5,
                "info": "Megacompleto",
                "Sport": {
                    "name": "Spinning"
                }
            }]
        };
        var local_api = "https://localhost:3000/api";
        $httpBackend.whenGET(local_api + '/establishments/1').respond(estab);
        $httpBackend.whenGET(local_api + '/establishments/2').respond(estab2);
        $httpBackend.whenGET('public/images/icons/location.svg').passThrough();
        $httpBackend.whenGET('public/images/icons/phone.svg').passThrough();
        $httpBackend.whenGET('public/images/icons/website.svg').passThrough();
        $httpBackend.whenGET('public/images/icons/thumb_up.svg').passThrough();
        $httpBackend.whenGET('app/establishment-details/est-details.html').passThrough();
        $httpBackend.whenGET('app/establishment-details/course-schedule.tmpl.html').passThrough();

        var s1 = {day: 'Martes', startTime: '10:00', endTime:"11:00", courseId: 1};
        var s2 = {day: 'Lunes', startTime: '11:00', endTime:"12:00", courseId: 1};
        var s3 = {day: 'Miércoles', startTime: '17:00', endTime:"18:00", courseId: 1};
        var s5 = {day: 'Jueves', startTime: '20:00', endTime:"21:00", courseId: 1};
        var s4 = {day: 'Jueves', startTime: '12:00', endTime:"13:00", courseId: 1};
        var s6 = {day: 'Viernes', startTime: '09:00', endTime:"10:00", courseId: 1};
        var schedule = {Schedule: {
            count: 6,
            rows: [s1,s2,s3,s4,s5,s6]
        }};
        $httpBackend.whenGET('https://localhost:3000/api/courses/1/schedule').respond(schedule);
        $httpBackend.whenGET('https://localhost:3000/api/courses/2/schedule').respond(404);
    }
