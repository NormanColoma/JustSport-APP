/**
 * Created by Norman on 17/04/2016.
 */
angular
    .module('registerModule')
    .factory('registerUserService', registerUserService);

    registerUserService.$inject = ['$http'];

    function registerUserService($http){
        var local_api = "https://localhost:3000/api";
        var server_api = "https://justsport-api.herokuapp.com/api";
        var server = local_api;



        var service = {
            registerUser: registerUser
        };

        return service;

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