/**
 * Created by Norman on 08/06/2016.
 */
angular
    .module('backOfficeModule')
    .directive('listCourses',listCourses);


function listCourses(){
    var directive = {
        templateUrl: 'app/backoffice-courses/list-courses.html',
        restrict: 'E'
    };
    return directive;
}