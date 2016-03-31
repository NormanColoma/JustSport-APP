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
        var indexes = new Map();
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
            getEstablishments: getEstablishments,
            getIndexOf: getIndexOf,
            setIndexes: setIndexes
        };

        return service;

        /**
         * @name getEstablishments
         * @desc Fetch all the establishments filtered by the sport, and location
         * @memberOf establishmentFilteredService
         * @param sport_id -> Represents id of the sports to look for
         * @param location -> Location to look for
         * @returns {Array || String}
         */
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

        /**
         *
         * @name getIndexOf
         * @desc Find in the Map and return the value which is associated with the given key
         * @memberOf establishmentFilteredService
         * @param {String} name -> Key of the map
         * @returns {Integer}
         */
        function getIndexOf(name){
            return indexes.get(name);
        }

        /**
         * @name setIndexes
         * @desc Set the Map from the given array
         * @memeberOf establishmtFilteredService
         * @param {Array} data -> Array which contains the name and the id of sports
         * @returns {Void}
         */
        function setIndexes(data){
            for(var i=0;i<data.rows.length;i++){
                indexes.set(data.rows[i].name, data.rows[i].id);
            }
        }

    }