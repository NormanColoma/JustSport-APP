/**
 * Created by Norman on 09/06/2016.
 */
angular
    .module('backOfficeModule')
    .directive('updateCourse',updateCourse);


function updateCourse(){
    var directive = {
        templateUrl: 'app/backoffice-courses/update-course.html',
        restrict: 'E'
    };
    return directive;
}