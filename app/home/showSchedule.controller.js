/**
 * Show Schedule Controller
 * @namespace Home
 */
angular
    .module('homeModule')
    .controller('ShowScheduleController', ShowScheduleController);

    ShowScheduleController.$inject = ['getScheduleService', '$mdDialog'];

    /**
    *
    * @namespace ShowScheduleController
    * @desc Controller that manages the information about schedules from Home
    * @memberOf Home
    */
    function ShowScheduleController(getScheduleService, $mdDialog){
        var vm = this;

        vm.courses = getScheduleService.getCourses();
        vm.getSchedule = getSchedule;
        vm.hideSchedule = hideSchedule;
        vm.isTimeGreater = isTimeGreater;
        vm.orderSchedule = orderSchedule;
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
                vm.schedule = data;
                vm.timetable = orderSchedule(vm.schedule);
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
         * @name isTimeGreater
         * @desc Checks if current time of schedule activity, is greater than old time
         * @memberOf ShowScheduleController
         * @param current-> String that represents current startTime
         * @param old-> String that represents old startTime
         * @returns {boolean}
         */
        function isTimeGreater(current, old){
            var current_t = current.split(":");
            var old_t = old.split(":");
            if(current_t[0] > old_t[0])
                return true;
            else if(current_t[0] === old_t[0]){
                if(current_t[1] >= old_t[1])
                    return true;
                return false;
            }else{
                return false;
            }

        }

        /**
         * @name orderSchedule
         * @desc Order the schedule ascending by day of week and time of day
         * @memberOf ShowScheduleController
         * @param schedule -> Array containing full schedule
         * @returns {Array}
         */
        function orderSchedule(schedule){
            var ordered_s = [];
            ordered_s.push(schedule[0]);
            for(var i=1;i<schedule.length;i++){
                if(schedule[i].day === "Lunes" && ordered_s[i-1].day !== "Lunes"){
                    ordered_s[i] = ordered_s[i-1];
                    ordered_s[i-1] = schedule[i];
                }else if(schedule[i].day === "Martes" && ordered_s[i-1].day !== "Martes" && ordered_s[i-1].day !== "Lunes"){
                    ordered_s[i] = ordered_s[i-1];
                    ordered_s[i-1] = schedule[i];
                }else if(schedule[i].day === "Miércoles" && ordered_s[i-1].day !== "Miércoles" &&
                    ordered_s[i-1].day !== "Martes" && ordered_s[i-1].day !== "Lunes"){
                    ordered_s[i] = ordered_s[i-1];
                    ordered_s[i-1] = schedule[i];
                }else if(schedule[i].day === "Jueves" && ordered_s[i-1].day === "Viernes" &&
                    ordered_s[i-1].day === "Sábado" && ordered_s[i-1].day === "Domingo"){
                    ordered_s[i] = ordered_s[i-1];
                    ordered_s[i-1] = schedule[i];
                }else if(schedule[i].day === "Viernes" && ordered_s[i-1].day !== "Viernes" &&
                    ordered_s[i-1].day !== "Jueves" && ordered_s[i-1].day !== "Miércoles" && ordered_s[i-1].day !== "Martes" &&
                    ordered_s[i-1]-day!=="Lunes"){
                    ordered_s[i] = ordered_s[i-1];
                    ordered_s[i-1] = schedule[i];
                }else if(schedule[i].day === "Sábado" && ordered_s[i-1].day === "Domingo"){
                    ordered_s[i] = ordered_s[i-1];
                    ordered_s[i-1] = schedule[i];
                }else if(schedule[i].day === ordered_s[i-1].day){
                    if(isTimeGreater(schedule[i].startTime,ordered_s[i-1].startTime)){
                        ordered_s[i] = schedule[i];
                    }else{
                        ordered_s[i] = ordered_s[i-1];
                        ordered_s[i-1] = schedule[i];
                    }
                }else{
                    ordered_s[i] = schedule[i];
                }
            }
            return ordered_s;
        }

        function showSchedule(ev){
            $mdDialog.show({
                templateUrl: 'app/home/est-schedule.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
            });
        }

    }