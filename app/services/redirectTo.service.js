/**
 * Created by Norman on 22/05/2016.
 */
/**
 * Login Service
 * @namespace Services
 */
angular
    .module('justSport')
    .factory('redirectService', redirectService);

    redirectService.$inject = ['$window'];

    function redirectService($window){

        var service = {
            checkRedirect: checkRedirect,
        };

        return service;

        function checkRedirect(url,absUrl,logged, role){
            if(url === "/login" || absUrl === "https://justsportapp.herokuapp.com/account" ||
                absUrl === "https://localhost:5000/account" || absUrl === "http://localhost:5000/account"){
                    if(logged)
                        return true;
                    else
                        return false;
            }else if(url === "/account/profile" || absUrl === "https://justsportapp.herokuapp.com/account/profile" ||
                absUrl === "https://localhost:5000/account/profile" || absUrl === "http://localhost:5000/account/profile"){
                    if(logged)
                        return false;
                    else
                        return true;
            }else if(url === "/backoffice" || absUrl === "https://justsportapp.herokuapp.com/backoffice" ||
                absUrl === "https://localhost:5000/backoffice" || absUrl === "http://localhost:5000/backoffice") {
                if (logged && role === 'owner')
                    return false;
                else
                    return true;
            }
            else{
                return false;
            }
        }
    }