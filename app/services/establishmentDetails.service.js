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
                },
                vote:{
                    method: 'POST',
                    url: server + '/establishments/:id/votes/new',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token
                    }
                }
            }
        );

        var service={
            getEstablishment: getEstablishment,
            vote: vote
        };

        return service;

        function getEstablishment(id){

            return Establishment.get({id:id}).$promise
                .then(getEstablishmentSuccess)
                .catch(getEstablishmentFailed);

            function getEstablishmentSuccess(data){
                var establishment={Establishment:{id: data.id, name: data.name, desc: data.desc, city: data.city,
                    province: data.province, addr: data.addr, phone: data.phone, website: data.website,
                    main_img: data.main_img}, Votes: data.Votes.length, Commentaries: data.Commentaries, Courses: data.Courses
                };
                return establishment;
            }

            function getEstablishmentFailed(err){
                var message = {message: "There was an error when loading establishment"};
                return message;
            }
        }

        function vote(id){
            return Establishment.vote({id:id}).$promise
                .then(voteEstablishmentSuccess)
                .catch(voteEstablishmentFailed);

            function voteEstablishmentSuccess(){
                return true;
            }

            function voteEstablishmentFailed(){
                return false;
            }
        }
    }
