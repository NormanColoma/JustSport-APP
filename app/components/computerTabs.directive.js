/**
 * Created by Norman on 17/06/2016.
 */
angular
    .module('backOfficeModule')
    .directive('computerTabs',computerTabs);


function computerTabs(){
    var directive = {
        templateUrl: 'app/backoffice/computer-tabs.html',
        restrict: 'E'
    };
    return directive;
}