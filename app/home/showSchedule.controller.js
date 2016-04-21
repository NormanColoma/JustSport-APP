/**
 * Created by Norman on 21/04/2016.
 */
angular
    .module('homeModule')
    .controller('ShowScheduleController', ShowScheduleController);

    ShowScheduleController.$inject = ['getScheduleService'];

    function ShowScheduleController(getScheduleService){
        var vm = this;

        vm.getSchedule = getSchedule;
        vm.schedule = null;

        function getSchedule(courses){
            vm.schedule = getScheduleService.getFullSchedule(courses);
        }

    }