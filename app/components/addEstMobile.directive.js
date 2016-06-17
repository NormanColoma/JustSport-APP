/**
 * Created by Norman on 17/06/2016.
 */
angular
    .module('backOfficeModule')
    .directive('addEstMobile',addEstMobile);


function addEstMobile(){
    var directive = {
        templateUrl: 'app/backoffice-estabs/add-est-mobile.html',
        restrict: 'E'
    };
    return directive;
}