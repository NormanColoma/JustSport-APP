/**
 * Establishment Details Service
 * @namespace Services
 */
angular
    .module('establishmentModule')
    .factory('establishmentDetailsService', establishmentDetailsService);

    establishmentDetailsService.$inject = ['$resource'];

    function establishmentDetailsService($resource){
        var local_api = "https://localhost:3000/api";
        var server_api = "https://justsport-api.herokuapp.com/api";
        var server = local_api;

        var Establishment = $resource(server+'/establishments/:id', {id:'@id'},{
                query: {
                    isArray:false,
                    method: 'GET'
                }
            }
        );

        var service={
            getEstablishment: getEstablishment
        };

        return service;

        function getEstablishment(id){

            return Establishment.get({id:id}).$promise
                .then(getEstablishmentSuccess)
                .catch(getEstablishmentFailed);

            function getEstablishmentSuccess(data){
                var establishment={id: data.id, name: data.name, desc: data.desc, city: data.city,
                    province: data.province, addr: data.addr, phone: data.phone, website: data.website,
                    main_img: data.main_img, Votes: data.Votes, Commentaries: data.Commentaries
                };
                return establishment;
            }

            function getEstablishmentFailed(err){
                var message = {message: "There was an error when loading establishment"};
                return message;
            }
        }
    }
