describe('Establishment Details Controller', function() {
    var $httpBackend, $rootScope, createController;
    var baseAPI = 'https://localhost:3000/api/';
    var estab = {id: 1,name: "Nombre Gym", desc: "Esta es la desc",city: "Alicante",
        province: "Alicante", addr: "Esta es la dirección", phone: "965660427", website: "www.pagina.com",
        main_img:"default.jpg", Votes:[{user: "8a74a3aa-757d-46f1-ba86-a56a0f107735"}],
        Commentaries:[{id: 1,
            text: "El gimnasio tiene unas instalaciones increíbles",
            createdAt: "2016-05-11T09:02:45.000Z"}],Courses:[{id: 1, instructor: "Juan Domínguez",
            price: 17.5, info: "Un curso muy completo", Sport: {"name": "Spinning"}
        }]
    };

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
            return $controller('EstablishmentDetailsController', {'$scope': $rootScope});
        };
    }));

    it('Should fetch the establishment', function(){
        var controller = createController();
        $httpBackend.expectGET(baseAPI+'establishments/1').respond(estab);
        controller.establishment = {};
        expect(controller.establishment).toEqual({});
        expect(controller.votes).toBe(0);
        expect(controller.commentaries).toEqual([]);
        expect(controller.courses).toEqual([]);
        /* jshint ignore:start*/
        controller.getEstablishment(1);
        /*jshint ignore:end */
        $httpBackend.flush();
        var expected_estab = {id: 1,name: "Nombre Gym", desc: "Esta es la desc",city: "Alicante",
            province: "Alicante", addr: "Esta es la dirección", phone: "965660427", website: "www.pagina.com",
            main_img:"default.jpg"};
        expect(controller.establishment).toEqual(expected_estab);
        expect(controller.votes).toEqual(estab.Votes.length);
        expect(controller.commentaries).toEqual(estab.Commentaries);
        expect(controller.courses).toEqual(estab.Courses);
    });

    it('Should format the date of commentaries', function(){
        var date = "2016-05-11T09:02:45.000Z";
        var controller = createController();
        var real_date = controller.formatDate(date);
        var expected_date = "11 de Mayo 2016, 11:02:45";
        expect(real_date).toEqual(expected_date);
    });

    it('Should get the correct hour', function(){
        var controller = createController();
        expect('02').toEqual(controller.getHour('24'));
        expect('00').toEqual(controller.getHour('22'));
        expect('01').toEqual(controller.getHour('23'));
        expect('09').toEqual(controller.getHour('07'));
        expect('11').toEqual(controller.getHour('09'));
    });

    it('Should add the new commentary and push it to array of commentaries', function(){
        var controller = createController();
        var comm = {Commentary: {id: 5, text: "El ambiente del gimnasio es increíble", "createdAt": "2016-05-12T22:53:31.433Z",
            User: {
                name: "Norman",
                img: "default.jpg"
            }}};
        var expected_comm = {id: 5, text: "El ambiente del gimnasio es increíble", "createdAt": "2016-05-12T22:53:31.433Z",
            User: {
                name: "Norman",
                img: "default.jpg"
            }};
        $httpBackend.expectPOST(baseAPI+'establishments/1/commentaries/new').respond(201, comm);
        expect(controller.commentaries).toEqual([]);
        expect(controller.commentaries.length).toEqual(0);
        var form = undefined;
        /* jshint ignore:start*/
        controller.addCommentary(1, "Este es el comentario",form);
        /*jshint ignore:end */
        $httpBackend.flush();
        expect(controller.commentaries.length).toEqual(1);
        expect(controller.commentaries[0]).toEqual(expected_comm);
    });

    it('Should fetch the course', function(){
        var controller = createController();
        var course1 = {Sport:{id: '1'},Establishment:{id:'1'},
            instructor: 'Juan Domínguez',price:'17.50',info:'Un curso muy completo'};
        $httpBackend.expectGET(baseAPI+'courses/1').respond(course1);
        var c1 = controller.getCourse(1);
        $httpBackend.flush();
        var expc_c = {sportId:'1', establishmentId:'1',instructor:'Juan Domínguez',price:'17.50',info:'Un curso muy completo'};
        expect(c1).toEqual(expc_c);
    });

    it('Should fetch the schedule of course', function(){
        var controller = createController();
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
        $httpBackend.expectGET(baseAPI+'courses/1/schedule').respond(schedule);
        var s = controller.getSchedule(1);
        $httpBackend.flush();
        expect(s).toEqual(schedule.Schedule.rows);
    });
});
