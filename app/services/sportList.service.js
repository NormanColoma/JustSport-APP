/**
 * Sport List Factory
 * @namespace Sports
 */
angular
    .module('sportModule')
    .factory('sportListService', sportListService);

    sportListService.$inject = ['$resource'];

    /**
     *
     * @namespace sportListService
     * @desc Sport list service
     * @memberOf Sports
     */
    function sportListService($resource, $http){
        var local_api = "https://localhost:3000/api";
        var server_api = "https://justsport-api.herokuapp.com/api";
        var server = server_api;

        var Sport = $resource(server+'/sports/:id', {id:'@id'},{
                query: {
                    isArray:false,
                    method: 'GET'
                }
            }
        );

        var service = {
            getSports: getSports,
        };

        return service;

        /**
         * @name getSports
         * @desc Fecth all sports
         * @returns {Array}
         * @memberOf Sports.sportListService
         */
        function getSports(){
            return Sport.get({limit: 100}).$promise
                .then(getSportsSuccess)
                .catch(getSportsFailed);

            function getSportsSuccess(data){
                return data.Sports;
            }

            function getSportsFailed(error){
                console.log(error);
            }
        }


    }