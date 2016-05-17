/**
 * Created by Norman on 11/05/2016.
 */
/**
 * Establishment details controller
 * @namespace Establishment Details
 */
angular
    .module('establishmentModule')
    .controller('EstablishmentDetailsController', EstablishmentDetailsController);

    EstablishmentDetailsController.$inject = ['establishmentDetailsService', 'formResetService', 'getScheduleService','dialogService'];

    /**
     *
     * @namespace EstablishmentDetailsController
     * @desc Controller that fetchs the details of establishment. It also shows its courses and schedule
     * @memberOf Establishment Details
     *
     */
    function EstablishmentDetailsController(establishmentDetailsService, formResetService, getScheduleService,dialogService){
        var vm=this;
        var local_folder = "https://localhost:3000/";
        var server_folder = "https://justsport-api.herokuapp.com/";
        var server = local_folder;

        vm.addCommentary = addCommentary;
        vm.commentaries = [];
        vm.course = establishmentDetailsService.getCourse();
        vm.courses = [];
        vm.establishment = null;
        vm.formatDate = formatDate;
        vm.getCourse = getCourse;
        vm.getEstablishment = getEstablishment;
        vm.getHour = getHour;
        vm.getMonth = getMonth;
        vm.getSchedule = getSchedule;
        vm.hideSchedule = hideSchedule;
        vm.imgFolder = server+"public/images/users/";
        vm.removeEstab = removeEstab;
        vm.schedule = [];
        vm.votes = 0;

        /**
         * @name addCommentary
         * @desc Add commentary to current list of commentaries.
         * @param id. The id of the establishment which owns the new commentary.
         * @param text. Text of commentary.
         * @form. Form to be cleaned.
         * @memberOf Home.EstablishmentDetailsController
         * @returns {void}
         */
        function addCommentary(id,text,form){
            if(text !== undefined && text !== null) {
                establishmentDetailsService.addComm(id, text).then(function (data) {
                    vm.commentaries.push(data);
                    formResetService.reset(form);
                    vm.text = null;
                });
            }
        }

        /**
         * @name formatDate
         * @desc It formats the given date to preferable format.
         * @param date. The date to be formatted.
         * @memberOf Home.EstablishmentDetailsController
         * @returns {String}
         */
        function formatDate(date){
            var split_index = date.indexOf('T');
            var full_date = date.slice(0,split_index);
            var full_time = date.slice(split_index+1,date.indexOf('.'));
            var month = full_date.slice(5,7);
            var year = full_date.slice(0,4);
            var day = full_date.slice(8,10);
            var hour = getHour(full_time.slice(0,2));
            var min = full_time.slice(3,5);
            var secs = full_time.slice(6,8);
            full_time = hour+":"+min+":"+secs;
            month = getMonth(month);
            date = day+" de "+month+" "+year+", "+full_time;
            return date;
        }

        /**
         * @name getEstablishment
         * @desc It gets the full establishment by its id.
         * @param id. The id of the establishment to be retrieved.
         * @memberOf Home.EstablishmentDetailsController
         * @returns {void}
         */
        function getEstablishment(id){
            establishmentDetailsService.getEstablishment(id).then(function(data){
                if(data === "There was an error when loading establishment"){

                }else{
                    vm.establishment = data.Establishment;
                    vm.commentaries = data.Commentaries;
                    vm.votes = data.Votes;
                    vm.courses = data.Courses;
                }
            });
        }

        /**
         * @name getCourse
         * @desc It looks for the course into the courses array. Then it will display the course view.
         * @param id. The id of the course.
         * @param ev. Event captured.
         * @memberOf Home.EstablishmentDetailsController
         * @returns {void}
         */
        function getCourse(id,ev){
            for(var i=0;i<vm.courses.length;i++){
                if(vm.courses[i].id === id){
                    establishmentDetailsService.setCourse(vm.courses[i]);
                    vm.course = vm.courses[i];
                }
            }
            var template = 'app/establishment-details/course-schedule.tmpl.html';
            dialogService.showCustomDialog(ev,template);
        }

        /**
         * @name getSchedule
         * @desc It retrieves the schedule that belongs to the course selected.
         * @param id. The id of the schedule.
         * @memberOf Home.EstablishmentDetailsController
         * @returns {void}
         */
        function getSchedule(id){
            getScheduleService.getSchedule(id).then(function(data){
                if(data === "There are no schedules for this course")
                    vm.schedule = [];
                else
                    vm.schedule = data;

            });
        }

        /**
         * @name getHour
         * @desc It gets the correct string of hour.
         * @param hour. String that represents the hour.
         * @memberOf Home.EstablishmentDetailsController
         * @returns {String}
         */
        function getHour(hour){
            hour = parseInt(hour);
            if(hour === 22){
                hour = "00";
            }else if(hour === 23){
                hour = "01";
            }else if(hour === 24){
                hour = "02";
            }else{
                hour = hour+2;
                hour = hour.toString();
                if(hour.length === 1){
                    hour="0"+hour;
                }
            }
            return hour;
        }

        /**
         * @name getMonth
         * @desc It gets the name of month.
         * @param month. String that represents the month in number.
         * @memberOf Home.EstablishmentDetailsController
         * @returns {String}
         */
        function getMonth(month){
            if(month === "01")
                month = "Enero";
            else if(month === "02"){
                month = "Febrero";
            }else if(month === "03"){
                month = "Marzo";
            }else if(month === "04"){
                month = "Abril";
            }else if(month === "05"){
                month = "Mayo";
            }else if(month === "06"){
                month = "Junio";
            }else if(month === "07"){
                month = "Julio";
            }else if(month === "08"){
                month = "Agosto";
            }else if(month === "09"){
                month = "Septiembre";
            }else if(month === "10"){
                month = "Octubre";
            }else if(month === "11"){
                month = "Noviembre";
            }else{
                month = "Diciembre";
            }

            return month;
        }

        /**
         * @name hideSchedule
         * @desc It hides the schedule dialog.
         * @memberOf Home.EstablishmentDetailsController
         * @returns {void}
         */
        function hideSchedule(){
            dialogService.hideDialog();
        }

        /**
         * @name removeEstab
         * @desc It cleans the establishment, commentaries, votes and courses members.
         * @memberOf Home.EstablishmentDetailsController
         * @returns {void}
         */
        function removeEstab(){
            vm.establishment = null;
            vm.commentaries = [];
            vm.votes = 0;
            vm.courses = [];
        }
    }