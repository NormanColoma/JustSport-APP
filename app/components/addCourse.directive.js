/**
 * Created by Norman on 10/06/2016.
 */
angular
    .module('backOfficeModule')
    .directive('addCourse',addCourse);


function addCourse(){
    var directive = {
        templateUrl: 'app/backoffice-courses/add-course.html',
        restrict: 'E'
    };
    return directive;
}