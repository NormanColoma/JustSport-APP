/**
 * Created by Norman on 22/05/2016.
 */
/**
 * Created by Norman on 22/05/2016.
 */
angular
    .module('backOfficeModule')
    .directive('backofficeEstabs',backofficeEstabs);


function backofficeEstabs(){
    var directive = {
        templateUrl: 'app/backoffice-estabs/back-office-estabs.html',
        restrict: 'E'
    };
    return directive;
}