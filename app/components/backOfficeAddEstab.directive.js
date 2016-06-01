/**
 * Created by Norman on 31/05/2016.
 */
angular
    .module('backOfficeModule')
    .directive('backofficeAddEst',backofficeAddEst);


function backofficeAddEst(){
    var directive = {
        templateUrl: 'app/backoffice-estabs/back-office-add-est.html',
        restrict: 'E'
    };
    return directive;
}