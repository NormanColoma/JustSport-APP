/**
 * City suggestions service
 * @namespace Services
 */
angular
    .module('homeModule')
    .factory('citySuggestionsService', citySuggestionsService);

    citySuggestionsService.$inject = ['$http'];

    /**
     *
     * @namespace citySuggestionsService
     * @desc Service that manages suggestions for cities
     * @memberOf Services
     */
    function citySuggestionsService($http){
        var local_api = "https://localhost:3000/api";
        var server_api = "https://justsport-api.herokuapp.com/api";
        var server = local_api;
        var service = {
            getCities: getCities,
        };

        return service;

        /**
         * @name getCities
         * @desc It communicates with the back-end server, and retrieve the suggestions of cities
         * @memberOf citySuggestionsService
         * @param {String} location -> String containing the location to look for
         * @returns {Array}
         */
        function getCities(location){
                return $http.get(server+"/establishments/"+location+"/suggestions").then(function(results){
                    return results.data.locations;
                });
            }
    }