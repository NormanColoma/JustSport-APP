/**
 * Created by Norman on 02/06/2016.
 */
angular
    .module('backOfficeModule')
    .directive('impartSport',impartSport);


function impartSport(){
    var directive = {
        templateUrl: 'app/backoffice-estabs/impart-sport.html',
        restrict: 'E'
    };
    return directive;
}