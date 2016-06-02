/**
 * Created by Norman on 02/06/2016.
 */
/**
 * Back Office Sport Service
 * @nameSpace Services
 */
angular
    .module('backOfficeModule')
    .factory('backOfficeSportService',backOfficeSportService);

    backOfficeSportService.$inject = ['$resource'];

    /**
     *
     * @namespaces backOfficeSportService
     * @desc Service that manages the operations related to associating and deleting sports from estabs
     * @memberOf Services
     */
    function backOfficeSportService($resource){
        var local_api = "https://localhost:3000/api";
        var server_api = "https://justsport-api.herokuapp.com/api";
        var server = local_api;

        var SportEst = $resource(server+'/establishments/:id', {id:'@id'},{
                associateSp:{
                    method: 'PUT',
                    url: server + '/establishments/:id/sports/new',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token
                    }
                }
            }
        );

        var service = {
            associateSp: associateSp
        };

        return service;

        /**
         * @name associateSp
         * @desc It associates the passed sport to the specified establishment
         * @param id-> It represents the id of the establishment
         * @param data-> It contains the id of the sport to be associated to the establishment
         * @memberOf backOfficeSportService
         * @returns {Boolean}
         */
        function associateSp(id,data){
            return SportEst.associateSp({id: id},data).$promise
                .then(associateSpSuccess)
                .catch(associateSpFailed);

            function associateSpSuccess(data){
                return true;
            }

            function associateSpFailed(data){
                return false;
            }
        }
    }