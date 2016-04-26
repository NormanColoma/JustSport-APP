/**
 * Get Schedule Service
 * @namespace Services
 */
angular
    .module('homeModule')
    .factory('getScheduleService', getScheduleService);

    getScheduleService.$inject = ['$resource'];

    /**
     * @namespace getScheduleService
     * @desc Service that fetch the schedule
     * @memberOf Services
     */
    function getScheduleService($resource){
        var local_api = "https://localhost:3000/api";
        var server_api = "https://justsport-api.herokuapp.com/api";
        var server = server_api;
        var sport = null;
        var estab = null;


        var Course = $resource(server+'/courses/:id', {id:'@id'},{
                schedule:{
                    method: 'GET',
                    url: server + '/courses/:id/schedule',
                    isArray: false
                },
                fullSchedule:{
                    method: 'GET',
                    url: server + '/establishments/:id/sport/:sport/schedule',
                    isArray: false
                }
            }
        );

        var service ={
            getCourse: getCourse,
            getEstab: getEstab,
            getFullSchedule: getFullSchedule,
            getSchedule: getSchedule,
            getSport: getSport,
            setEstab: setEstab,
            setSport: setSport
        };

        return service;

        /**
         * @name getCourse
         * @desc Fetch the course by its id
         * @memberOf getScheduleService
         * @param id -> Represents the id of the course
         * @returns {course}
         */
        function getCourse(id){

            return Course.get({id: id}).$promise
                .then(getCourseSuccess)
                .catch(getCourseFailed);

            function getCourseSuccess(data){
                var course = {sportId: data.Sport.id, establishmentId: data.Establishment.id,
                instructor: data.instructor, price: data.price, info: data.info};
                return course;
            }

            function getCourseFailed(err){
                return err.data.message;
            }
        }

        /**
         * @name getEstab
         * @desc Returns the estab
         * @memberOf getScheduleService
         * @returns {integer}
         */
        function getEstab(){
            return estab;
        }

        /**
         * @name getFullSchedule
         * @desc Fetch the schedules for courses that belong to the establishment and sport passed
         * @memberOf getScheduleService
         * @param id -> Represents the id of the establishment
         * @param sport -> Represents the id of the sport
         * @returns {Array}
         */
        function getFullSchedule(id,sport){
            return Course.fullSchedule({id:id,sport:sport}).$promise
                .then(getFullScheduleSuccess)
                .catch(getFullScheduleFailed);

            function getFullScheduleSuccess(data){
                return data.Schedule.rows;
            }

            function getFullScheduleFailed(err){
                return err.data.message;
            }
        }

        /**
         * @name getSchedule
         * @desc Fetch the schedule of the course
         * @memberOf getScheduleService
         * @param id -> Represents the id of the course
         * @returns {Array}
         */
        function getSchedule(id){
            return Course.schedule({id: id}).$promise
                .then(getScheduleSuccess)
                .catch(getScheduleFailed);

            function getScheduleSuccess(data){
                return data.Schedule.rows;
            }

            function getScheduleFailed(err){
                return err.data.message;
            }
        }

        /**
         * @name getSport
         * @desc Returns the sport typed in the main search of the app
         * @memberOf getScheduleService
         * @returns {string}
         */
        function getSport(){
            return sport;
        }

        /**
         * @name setEstab
         * @desc Sets the estab variable
         * @memberOf getScheduleService
         * @param est-> The id of the establishment to retrieve the schedule
         */
        function setEstab(est){
            estab = est;
        }

        /**
         * @name setSport
         * @desc Sets the sport
         * @param sp-> Sport typed by the user in the main search
         * @return {void}
         */
        function setSport(sp){
            sport = sp;
        }
    }