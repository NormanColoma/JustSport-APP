/**
 * Created by Norman on 10/06/2016.
 */
angular
    .module('backOfficeModule')
    .directive('deleteSc', deleteSc);

deleteSc.$inject = ['$mdDialog','backOfficeScheduleService'];

function deleteSc($mdDialog,backOfficeScheduleService) {
    var directive = {
        restrict: 'EA',
        link: linkFunc,
    };

    return directive;

    function linkFunc(scope, el, attr) {
        el.on('click', function(){
            var id = parseInt(attr.name);
            var course = attr.id.split("delete-schedule-");
            var idCourse= parseInt(course[1]);
            var sched = $("#schedule-"+id);
            backOfficeScheduleService.deleteSchedule(id,idCourse).then(function(data){
                 if(data === true)
                    sched.fadeOut("normal", function() { $(this).remove(); } );
             });
        });
    }
}