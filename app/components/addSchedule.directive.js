/**
 * Created by Norman on 11/06/2016.
 */
angular
    .module('backOfficeModule')
    .directive('addSchedule',addSchedule);


function addSchedule(){
    var directive = {
        templateUrl: 'app/backoffice-schedule/add-schedule.html',
        restrict: 'E'
    };
    return directive;
}