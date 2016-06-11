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
        var server = server_api;

        var Course = $resource(server+'/courses/:id', {id:'@id'}, {
            update: {
                method: 'PUT',
                url: server + '/courses/:id',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.token
                }
            },delete: {
                method: 'DELETE',
                url: server + '/courses/:id',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.token
                }
            },add: {
                method: 'POST',
                url: server + '/courses/new',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.token
                }
            }
        });

        var service = {
            add:add,
            deleteCourse: deleteCourse,
            update: update
        };

        return service;

        /**
         * @name add
         * @desc It adds new course
         * @param data-> It contains the data of the new course
         * @memberOf backOfficeCoursesService
         * @returns {Boolean}
         */
        function add(data){
            return Course.add(data).$promise
                .then(addCourseSuccess)
                .catch(addCourseFailed);

            function addCourseSuccess(data){
                var d = {id: data.id,info: data.info,instructor: data.instructor, price: data.price};
                return d;
            }

            function addCourseFailed(data){
                return false;
            }
        }

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

        /**
         * @name delete
         * @desc It deletes the specified course
         * @param id-> The id of the course
         * @memberOf backOfficeCoursesService
         * @returns {Boolean}
         */
        function deleteCourse(id){
            return Course.delete({id:id}).$promise
                .then(deleteCourseSuccess)
                .catch(deleteCourseFailed);

            function deleteCourseSuccess(data){
                return true;
            }

            function deleteCourseFailed(data){
                return false;
            }
        }
    }