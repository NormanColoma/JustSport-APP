/**
 * Register Service
 * @nameSpace Services
 */
angular
    .module('registerModule')
    .factory('registerUserService', registerUserService);

    registerUserService.$inject = ['$http'];

    /**
    *
    * @namespaces registerUserService
    * @desc Services that manages the user registration
    * @memberOf Services
    */
    function registerUserService($http){
        var local_api = "https://localhost:3000/api";
        var server_api = "https://justsport-api.herokuapp.com/api";
        var server = server_api;



        var service = {
            registerUser: registerUser
        };

        return service;

        /**
         * @name registerUser
         * @desc Register the user making and http request through the API
         * @memberOf registerUserService
         * @param user -> User to be registered
         * @returns {Boolean || String}
         */
        function registerUser(user){
            var data = {
                name:user.name, lname:user.lname, email:user.email,
                pass:user.password, gender:user.gender, role :user.role
            };
            return $http.post(server+"/users/new", data)
                .then(registerSuccess)
                .catch(registerFail);

            function registerSuccess(data){
                return true;
            }

            function registerFail(err){
                return err.data.errors[0].message;
            }
        }
    }