/**
 * Created by Norman on 21/04/2016.
 */
angular
    .module('homeModule')
    .controller('ShowScheduleController', ShowScheduleController);

    ShowScheduleController.$inject = ['getScheduleService', '$mdDialog'];

    function ShowScheduleController(getScheduleService, $mdDialog){
        var vm = this;

        vm.courses = getScheduleService.getCourses();
        vm.getSchedule = getSchedule;
        vm.hideSchedule = hideSchedule;
        vm.schedule = null;
        vm.showSchedule = showSchedule;


        function getSchedule(courses){
            vm.schedule = getScheduleService.getFullSchedule(courses);
        }

        function hideSchedule(){
            $mdDialog.cancel();
        }

        function showSchedule(ev, courses){
            getScheduleService.setCourses(courses);
            $mdDialog.show({
                templateUrl: 'app/home/est-schedule.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
            });
        }

    }