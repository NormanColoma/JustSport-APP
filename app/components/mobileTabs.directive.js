/**
 * Created by Norman on 17/06/2016.
 */
angular
    .module('backOfficeModule')
    .directive('mobileTabs',mobileTabs);


function mobileTabs(){
    var directive = {
        templateUrl: 'app/backoffice/mobile-tabs.html',
        restrict: 'E'
    };
    return directive;
}