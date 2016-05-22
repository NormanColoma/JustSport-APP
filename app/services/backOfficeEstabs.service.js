/**
 * Created by Norman on 22/05/2016.
 */
/**
 * Back Office Estab Service
 * @nameSpace Services
 */
angular
    .module('backOfficeModule')
    .factory('backOfficeEstabService', backOfficeEstabService);

    backOfficeEstabService.$inject = ['$resource'];

    /**
    *
    * @namespaces backOfficeEstabService
    * @desc Service that manages the operations related to establishments in the back office
    * @memberOf Services
    */
    function backOfficeEstabService($resource){
        var local_api = "https://localhost:3000/api";
        var server_api = "https://justsport-api.herokuapp.com/api";
        var server = local_api;

        var Establishment = $resource(server+'/establishments/:id', {id:'@id'},{
                getEsts: {
                    isArray:false,
                    method: 'GET',
                    url: server + '/establishments/me/all',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token
                    }
                }
            }
        );

        var service = {
            getEstabs: getEstabs
        };

        return service;

        /**
         * @name getEstabs
         * @desc It gets the establishments that belongs to the owner
         * @memberOf backOfficeEstabService
         * @returns {Array || Object}
         */
        function getEstabs(){
            return Establishment.getEsts().$promise
                .then(getEstsSuccess)
                .catch(getEstsFailed);

            function getEstsSuccess(data){
                var data = {Establishments: data.Establishments, paging: data.paging};
                return data;
            }

            function  getEstsFailed(error){
                var message = {message: "An error occurred"};
                return message;
            }
        }
    }