/**
 * Created by Norman on 10/06/2016.
 */
angular
    .module('backOfficeModule')
    .directive('listSchedule',listSchedule);


function listSchedule(){
    var directive = {
        templateUrl: 'app/backoffice-schedule/list-schedule.html',
        restrict: 'E'
    };
    return directive;
}