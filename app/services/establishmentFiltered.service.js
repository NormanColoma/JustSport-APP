/**
 * Establishment Filtered Service
 * @namespace Services
 */
angular
    .module('homeModule')
    .factory('establishmentFilteredService', establishmentFilteredService);

    establishmentFilteredService.$inject = ['$resource'];

    /**
     * @namespace establishmentFilteredService
     * @desc Service that fetch establishments filtered
     * @memberOf Services
     */
    function establishmentFilteredService($resource){
        var local_api = "https://localhost:3000/api";
        var server_api = "https://justsport-api.herokuapp.com/api";
        var server = local_api;

        var Establishment = $resource(server+'/establishments/sport/:id/location/:location', {id:'@id', location:'@location'},{
                query: {
                    isArray:false,
                    method: 'GET'
                }
            }
        );

        var service = {
            getEstablishments: getEstablishments
        };

        return service;

        function getEstablishments(sport_id, location){
            return Establishment.get({id: sport_id, location: location}).$promise
                .then(getEstabsSuccess)
                .catch(getEstabsFailed);

            function getEstabsSuccess(data){
                return data.Establishments;
            }

            function  getEstabsFailed(error){
                return error.data.message;
            }


        }

    }