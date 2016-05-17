/**
 * Created by Norman on 11/05/2016.
 */
angular
    .module('establishmentModule')
    .directive('establishmentDetails',establishmentDetails);


    function establishmentDetails(){
        var directive = {
            templateUrl: 'app/establishment-details/est-details.html',
            restrict: 'E'
        };
        return directive;
    }