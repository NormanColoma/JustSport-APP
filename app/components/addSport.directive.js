/**
 * Created by Norman on 07/06/2016.
 */
angular
    .module('backOfficeModule')
    .directive('addSport',addSport);


function addSport(){
    var directive = {
        templateUrl: 'app/backoffice-sports/add-sport.html',
        restrict: 'E'
    };
    return directive;
}