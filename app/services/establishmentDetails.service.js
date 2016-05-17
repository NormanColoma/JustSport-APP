/**
 * Establishment Details Service
 * @namespace Services
 */
angular
    .module('establishmentModule')
    .factory('establishmentDetailsService', establishmentDetailsService);

    establishmentDetailsService.$inject = ['$resource', '$http'];

    /**
     * @namespace establishmentDetailsService
     * @desc Service that fetch the details of establishment
     * @memberOf Services
     */
    function establishmentDetailsService($resource, $http){
        var local_api = "https://localhost:3000/api";
        var server_api = "https://justsport-api.herokuapp.com/api";
        var server = local_api;
        var course = null;
        var schedule = null;

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
            addComm: addComm,
            getCourse: getCourse,
            getEstablishment: getEstablishment,
            setCourse: setCourse,
            vote: vote
        };

        return service;

        /**
         * @name addComm
         * @desc Add new commentary, and return the data posted.
         * @memberOf establishmentDetailsService
         * @param id -> Represents id of the establishments
         * @param text -> Text of commentary
         * @returns {Object || String}
         */
        function addComm(id, text){
            var data ={
                text: text
            };
            return $http({method: 'POST', url: server + '/establishments/'+id+'/commentaries/new',
                headers: {
                'Authorization': 'Bearer ' + localStorage.token
                },data: data
            })
                .then(addCommSuccess)
                .catch(addCommFailed);

            function  addCommSuccess(data){
                return data.data.Commentary;
            }

            function addCommFailed(err){
                var message = {message: "Something failed"};
                return message;
            }
        }


        /**
         * @name getCourse
         * @desc Return the current course
         * @memberOf establishmentDetailsService
         * @returns {Object}
         */
        function getCourse(){
            return course;
        }


        /**
         * @name addComm
         * @desc Fetch the establishment
         * @memberOf establishmentDetailsService
         * @param id -> Represents id of the establishments
         * @returns {Object || String}
         */
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


        /**
         * @name setCourse
         * @desc Set the current course to the course passed by parameter
         * @memberOf establishmentDetailsService
         * @param c -> Represents the course
         * @returns {Void}
         */
        function setCourse(c){
            course = c;
        }


        /**
         * @name vote
         * @desc Add new vote to the establishment
         * @memberOf establishmentDetailsService
         * @param id -> Represents id of the establishments
         * @returns {Boolean}
         */
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
