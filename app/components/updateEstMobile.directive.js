/**
 * Created by Norman on 17/06/2016.
 */
angular
    .module('backOfficeModule')
    .directive('updateEstMobile',updateEstMobile);


function updateEstMobile(){
    var directive = {
        templateUrl: 'app/backoffice-estabs/update-est-mobile.html',
        restrict: 'E'
    };
    return directive;
}