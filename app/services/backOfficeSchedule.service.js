/**
 * Created by Norman on 10/06/2016.
 */
/**
 * Back Office Schedule Service
 * @nameSpace Services
 */
angular
    .module('backOfficeModule')
    .factory('backOfficeScheduleService', backOfficeScheduleService);

    backOfficeScheduleService.$inject = ['$resource','$http'];

    /**
     *
     * @namespaces backOfficeScheduleService
     * @desc Service that manages the operations related to schedules in the back office
     * @memberOf Services
     */
    function backOfficeScheduleService($resource,$http) {
        var local_api = "https://localhost:3000/api";
        var server_api = "https://justsport-api.herokuapp.com/api";
        var server = local_api;

        var Schedule = $resource(server+'/schedules/:id', {id:'@id'}, {
            add: {
                method: 'POST',
                url: server + '/schedules/new',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.token
                }
            }
        });

        var service = {
            add: add,
            deleteSchedule: deleteSchedule
        };

        return service;

        /**
         * @name add
         * @desc It adds the new schedule
         * @param data-> Data of new schedule
         * @memberOf backOfficeScheduleService
         * @returns {Boolean}
         */
        function add(data){
            return Schedule.add(data).$promise
                .then(addScheduleSuccess)
                .catch(addScheduleFailed);

            function addScheduleSuccess(data){
                return data.id;
            }

            function addScheduleFailed(data){
                return false;
            }
        }

        /**
         * @name deleteSchedule
         * @desc It deletes the specified schedule
         * @param id-> The id of the schedule
         * @param idCourse-> The id of the course which has the shcedule
         * @memberOf backOfficeScheduleService
         * @returns {Boolean}
         */
        function deleteSchedule(id,idCourse){
            var data = {courseId: idCourse};
            return $http({
                method  : 'DELETE',
                url     : server+'/schedules/'+id,
                data    : data,
                headers : { 'Authorization': 'Bearer ' + localStorage.token, 'Content-Type': 'application/json;charset=utf-8'}
            })
                .then(deleteScheduleSuccess)
                .catch(deleteScheduleFailed);

            function deleteScheduleSuccess(data){
                return true;
            }

            function deleteScheduleFailed(data){
                return false;
            }
        }
    }