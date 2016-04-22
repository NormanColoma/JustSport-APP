/**
 * Created by Norman on 21/04/2016.
 */
angular
    .module('homeModule')
    .factory('getScheduleService', getScheduleService);

    getScheduleService.$inject = ['$resource'];

    function getScheduleService($resource){
        var local_api = "https://localhost:3000/api";
        var server_api = "https://justsport-api.herokuapp.com/api";
        var server = local_api;
        var courses = [];

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
            getCourses: getCourses,
            getCourse: getCourse,
            getFullSchedule: getFullSchedule,
            getSchedule: getSchedule,
            setCourses: setCourses
        };

        return service;

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

        function getCourses(){
            return courses;
        }

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

        function setCourses(cour){
            courses = cour;
        }
    }