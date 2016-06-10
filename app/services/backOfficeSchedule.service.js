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

    backOfficeScheduleService.$inject = ['$resource'];

    /**
     *
     * @namespaces backOfficeScheduleService
     * @desc Service that manages the operations related to schedules in the back office
     * @memberOf Services
     */
    function backOfficeScheduleService($resource) {
        var local_api = "https://localhost:3000/api";
        var server_api = "https://justsport-api.herokuapp.com/api";
        var server = local_api;

        var Schedule = $resource(server+'/schedules/:id', {id:'@id'}, {
            delete: {
                method: 'DELETE',
                url: server + '/schedules/:id',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.token
                }
            }
        });

        var service = {
            deleteSchedule: deleteSchedule
        };

        return service;

        /**
         * @name deleteSchedule
         * @desc It deletes the specified schedule
         * @param id-> The id of the schedule
         * @memberOf backOfficeScheduleService
         * @returns {Boolean}
         */
        function deleteSchedule(id){
            return Schedule.delete({id:id}).$promise
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