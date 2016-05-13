/**
 * Created by Norman on 13/05/2016.
 */
angular
    .module('justSport')
    .factory('formResetService', formResetService);

    function formResetService(){

        var service = {
            reset: reset
        };

        return service;
        function reset(form){
            if(form !== undefined) {
                form.$setPristine();
                form.$setUntouched();
            }
        }
    }