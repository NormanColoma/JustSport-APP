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

    backOfficeEstabService.$inject = ['$resource','$http'];

    /**
    *
    * @namespaces backOfficeEstabService
    * @desc Service that manages the operations related to establishments in the back office
    * @memberOf Services
    */
    function backOfficeEstabService($resource,$http){
        var local_api = "https://localhost:3000/api";
        var server_api = "https://justsport-api.herokuapp.com/api";
        var server = server_api;

        var estabs = null;
        var courses = [];

        var Establishment = $resource(server+'/establishments/:id', {id:'@id'},{
                addEstab:{
                    method: 'POST',
                    url: server + '/establishments/new',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token
                    }
                },
                getEsts: {
                    isArray:false,
                    method: 'GET',
                    url: server + '/establishments/me/all',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token
                    }
                },deleteEstablishment:{
                    method: 'DELETE',
                    url: server + '/establishments/:id',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token
                    }
                }, updateEstab:{
                    method: 'PUT',
                    url: server + '/establishments/:id',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token
                    }
                }
            }
        );

        var service = {
            addEstablishment: addEstablishment,
            deleteEstablishment: deleteEstablishment,
            getCourses: getCourses,
            getEstabs: getEstabs,
            getFullEsts: getFullEsts,
            updateEstablishment: updateEstablishment,
            uploadImg: uploadImg
        };

        return service;

        /**
         * @name addEstablishment
         * @desc It posts the new establishment and returns it back
         * @param Data-> It contains the information about the new establishment to be posted
         * @memberOf backOfficeEstabService
         * @returns {Object}
         */
        function addEstablishment(data){
            return Establishment.addEstab(data).$promise
                .then(addEstablishmentSuccess)
                .catch(addEstablishmentFailed);

            function addEstablishmentSuccess(data){
                var d = {id: data.id, name: data.name, desc:data.desc, city: data.city, province: data.province, addr: data.addr,
                phone: data.phone, website: data.website, main_img: data.main_img};
                return d;
            }

            function addEstablishmentFailed(err){
                var message = {message: "An error occurred when posting establishment"};
                return message;
            }
        }

        /**
         * @name deleteEstablishment
         * @desc It deletes the establishment passed by its id
         * @param Id-> It represents the id of establishment to be removed
         * @memberOf backOfficeEstabService
         * @returns {Boolean}
         */
        function deleteEstablishment(id){
            return Establishment.deleteEstablishment({id:id}).$promise
                .then(deleteEstablishmentSuccess)
                .catch(deleteEstablishmentFailed);

            function deleteEstablishmentSuccess(data){
                return true;
            }

            function deleteEstablishmentFailed(data){
                return false;
            }
        }

        function getCourses(){
            return courses;
        }

        /**
         * @name getFullEsts
         * @desc It retrieves all the establishments. It will only return the id and name (we'll use them for courses view)
         * @memberOf backOfficeEstabService
         * @returns {Array || Object}
         */
        function getFullEsts(){
            return Establishment.getEsts({limit: 200}).$promise
                .then(getEstsSuccess)
                .catch(getEstsFailed);

            function getEstsSuccess(data){
                estabs = data.Establishments;
                var ests = [];
                courses = [];
                for(var i=0;i<estabs.rows.length;i++){
                    var est = {id: estabs.rows[i].id, name: estabs.rows[i].name};
                    var c = {establishmentId:estabs.rows[i].id, rows: estabs.rows[i].Courses};
                    ests.push(est);
                    courses.push(c);
                }
                return ests;
            }

            function  getEstsFailed(error){
                var message = {message: "An error occurred"};
                return message;
            }
        }

        /**
         * @name getEstabs
         * @desc It gets the establishments that belongs to the owner
         * @memberOf backOfficeEstabService
         * @returns {Array || Object}
         */
        function getEstabs(after){
            if(after === "none")
                after = undefined;
            return Establishment.getEsts({limit: 3, after: after}).$promise
                .then(getEstsSuccess)
                .catch(getEstsFailed);

            function getEstsSuccess(data){
                estabs = data.Establishments;
                var ests = [];
                for(var i=0;i<estabs.rows.length;i++){
                    var est = {id: estabs.rows[i].id, name: estabs.rows[i].name, desc: estabs.rows[i].desc,
                    city:estabs.rows[i].city,province: estabs.rows[i].province, addr: estabs.rows[i].addr,
                    phone:estabs.rows[i].phone,website: estabs.rows[i].website, main_img: estabs.rows[i].main_img};
                    ests.push(est);
                }
                var d = {Establishments: ests, paging: data.paging};
                return d;
            }

            function  getEstsFailed(error){
                var message = {message: "An error occurred"};
                return message;
            }
        }

        /**
         * @name updateEstablishment
         * @desc It updates the specified establishment
         * @param id. It represents the id of the establisment to be updated
         * @param data. It contains the new data for the establishment
         * @memberOf backOfficeEstabService
         * @returns {Boolean}
         */
        function updateEstablishment(id,data){
            return Establishment.updateEstab({id:id}, data).$promise
                .then(updateEstablishmentSuccess)
                .catch(updateEstablishmentFailed);

            function updateEstablishmentSuccess(res){
                return true;
            }

            function updateEstablishmentFailed(res){
                return false;
            }
        }

        function uploadImg(file,id){
            var payload = new FormData();
            payload.append("est_profile", file);
            return $http({
                method  : 'PUT',
                url     : server+'/establishments/'+id+"/new/image",
                data    : payload, //forms user object
                headers : { 'Authorization': 'Bearer ' + localStorage.token,'Content-Type': undefined}
            })
                .then(uploadImgSuccess)
                .catch(uploadImgFailed);

            function uploadImgSuccess(){
                return true;
            }
            function uploadImgFailed(){
                return false;
            }
        }
    }