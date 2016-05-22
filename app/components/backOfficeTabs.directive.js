/**
 * Created by Norman on 22/05/2016.
 */
angular
    .module('backOfficeModule')
    .directive('backofficeTabs',backofficeTabs);


function backofficeTabs(){
    var directive = {
        templateUrl: 'app/backoffice/back-office-tabs.html',
        restrict: 'E'
    };
    return directive;
}