/**
 * Login Service
 * @namespace Services
 */
angular
    .module('loginModule')
    .factory('loginService', loginService);

    loginService.$inject = ['$http'];

    /**
    *
    * @namespace loginService
    * @desc Services that manages the log in/log out
    * @memberOf Services
    */
    function loginService($http){
        var client_id = "2xa001za-78b3-4f38-9376-e2dd88b7c682";
        var local_api = "https://localhost:3000/api";
        var server_api = "https://justsport-api.herokuapp.com/api";
        var server = server_api;
        var service = {
            getToken: getToken,
            isLoggedIn: isLoggedIn
        };

        return service;

        /**
         * @name getToken
         * @desc Get the token for user.
         * @memberOf loginService
         * @param email -> Represents the username grant type
         * @param pass  -> Reperesents the password grant type
         * @returns {Token || Error}
         */
        function getToken(email,pass){
            var data = {username: email,password: pass,grant_type: 'password', client_id: client_id};
            return $http.post(server+"/oauth2/token", data)
                .then(getTokenSuccess)
                .catch(getTokenFail);

            function getTokenSuccess(data){
                return data.data;
            }

            function getTokenFail(err){
                return err.data;
            }
        }

        /**
         * @name isLoggedIn
         * @desc Checks if user is logged into the application
         * @memberOf loginService
         * @returns {boolean}
         */
        function isLoggedIn(){
            if(localStorage.username !== undefined){
                return true;
            }
            return false;
        }
    }