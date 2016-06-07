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
                },
                getSports:{
                    isArray:false,
                    method: 'GET',
                    url: server + '/establishments/:id/sports',
                },addSp:{
                    method: 'POST',
                    url: server + '/sports/new',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token
                    }
                }
            }
        );

        var service = {
            addSp: addSp,
            associateSp: associateSp,
            getSports: getSports
        };

        return service;


        /**
         * @name addSp
         * @desc It adds new sport
         * @param data-> It contains the name of the sport to be added
         * @memberOf backOfficeSportService
         * @returns {Object||String}
         */
        function addSp(data){
            return SportEst.addSp(data).$promise
                .then(addSpSuccess)
                .catch(addSpFailed);

            function addSpSuccess(data){
                var sp = {id: data.id, name: data.name};
                return sp;
            }

            function addSpFailed(data){
                return data.data.errors[0].message;
            }
        }

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

        /**
         * @name getSports
         * @desc It retrieves a collection of sports that are being imparted at the specified establishment
         * @param id-> It represents the id of the establishment
         * @memberOf backOfficeSportService
         * @returns {Array}
         */
        function getSports(id){
            return SportEst.getSports({id: id, limit: 200}).$promise
                .then(getSportsSuccess)
                .catch(getSportsFailed);

            function getSportsSuccess(data){
                return data.Sports.rows;
            }

            function getSportsFailed(data){
                return [];
            }
        }
    }