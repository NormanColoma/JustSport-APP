/**
 * Created by Norman on 09/06/2016.
 */
/**
 * Back Office Courses Service
 * @nameSpace Services
 */
angular
    .module('backOfficeModule')
    .factory('backOfficeCoursesService', backOfficeCoursesService);

    backOfficeCoursesService.$inject = ['$resource','$http'];

    /**
     *
     * @namespaces backOfficeCoursesService
     * @desc Service that manages the operations related to courses in the back office
     * @memberOf Services
     */
    function backOfficeCoursesService($resource,$http) {
        var local_api = "https://localhost:3000/api";
        var server_api = "https://justsport-api.herokuapp.com/api";
        var server = local_api;

        var Course = $resource(server+'/courses/:id', {id:'@id'}, {
            update: {
                method: 'PUT',
                url: server + '/courses/:id',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.token
                }
            },
        });

        var service = {
            update: update
        };

        return service;

        /**
         * @name update
         * @desc It updates the specified course
         * @param data-> It contains the information about the course to be updated
         * @param id-> The id of the course
         * @memberOf backOfficeCoursesService
         * @returns {Boolean}
         */
        function update(id,data){
            return Course.update({id:id},data).$promise
                .then(updateCourseSuccess)
                .catch(updateCourseFailed);

            function updateCourseSuccess(data){
                return true;
            }

            function updateCourseFailed(data){
                return false;
            }
        }
    }