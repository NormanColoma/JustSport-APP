/**
 * Show Schedule Controller
 * @namespace Home
 */
angular
    .module('homeModule')
    .controller('ShowScheduleController', ShowScheduleController);

    ShowScheduleController.$inject = ['getScheduleService', 'dialogService', '$mdDialog'];

    /**
    *
    * @namespace ShowScheduleController
    * @desc Controller that manages the information about schedules from Home
    * @memberOf Home
    */
    function ShowScheduleController(getScheduleService, dialogService, $mdDialog){
        var vm = this;

        vm.estab = getScheduleService.getEstab();
        vm.sport = getScheduleService.getSport();
        vm.getSchedule = getSchedule;
        vm.hideSchedule = hideSchedule;
        vm.schedule = null;
        vm.showSchedule = showSchedule;
        vm.timetable = null;

        /**
         * @name getSchedule
         * @desc Fetch the full schedule and order it
         * @memberOf ShowScheduleController
         * @param id -> Id of the establishment
         * @param sport -> Id of the sport
         * @return {Void}
         */
        function getSchedule(id,sport){
            getScheduleService.getFullSchedule(id,sport).then(function(data){
                if(data !== 'There is no schedule established yet') {
                    vm.schedule = data;
                    vm.timetable = vm.schedule;
                }else{
                    vm.schedule = null;
                    vm.timetable = vm.schedule;
                }
            });
        }

        /**
         * @name hideSchedule
         * @desc Hides the schedule dialog
         * @memberOf ShowScheduleController
         * @return {void}
         */
        function hideSchedule(){
            $mdDialog.cancel();
        }

        /**
         * @name showSchedule
         * @desc Sets the id of establishment, and show the schedule into dialog
         * @memberOf ShowScheduleController
         * @param ev->Event captured
         * @param estabId-> Represents the id of establishment to be stored in service
         * @return {void}
         */
        function showSchedule(ev, estabId){
            var template = 'app/home/est-schedule.tmpl.html';
            getScheduleService.setEstab(estabId);
            dialogService.showCustomDialog(ev,template);
        }

    }