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
        vm.extractSchedule = extractSchedule;
        vm.getSchedule = getSchedule;
        vm.hideSchedule = hideSchedule;
        vm.isTimeGreater = isTimeGreater;
        vm.orderSchedule = orderSchedule;
        vm.schedule = null;
        vm.showSchedule = showSchedule;


        function getSchedule(courses){
            vm.schedule = getScheduleService.getFullSchedule(courses);
        }

        function extractSchedule(){
            var extracted = [];
            for(var i=0;i<vm.schedule.length;i++){
                for(var j=0;j<vm.schedule[i].timetable.length;j++)
                    extracted.push(vm.schedule[i].timetable[j]);
            }
            return extracted;
        }

        function hideSchedule(){
            $mdDialog.cancel();
        }

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