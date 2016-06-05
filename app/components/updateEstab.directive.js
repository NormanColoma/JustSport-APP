/**
 * Created by Norman on 05/06/2016.
 */
angular
    .module('backOfficeModule')
    .directive('updateEstab',updateEstab);


function updateEstab(){
    var directive = {
        templateUrl: 'app/backoffice-estabs/update-estab.html',
        restrict: 'E'
    };
    return directive;
}