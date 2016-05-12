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

    EstablishmentDetailsController.$inject = ['establishmentDetailsService', 'dialogService'];

    function EstablishmentDetailsController(establishmentDetailsService, dialogService){
        var vm=this;
        var local_folder = "https://localhost:3000/";
        var server_folder = "https://justsport-api.herokuapp.com/";
        var server = local_folder;

        vm.commentaries = [];
        vm.courses = [];
        vm.establishment = null;
        vm.formatDate = formatDate;
        vm.getEstablishment = getEstablishment;
        vm.getHour = getHour;
        vm.getMonth = getMonth;
        vm.imgFolder = server+"public/images/users/";
        vm.removeEstab = removeEstab;
        vm.votes = 0;

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

        function getHour(hour){
            hour = parseInt(hour);
            if(hour === 22){
                hour = "00";
            }else if(hour === 23){
                hour = "01";
            }else if(hour === 24){
                hour = "02"
            }else{
                hour = hour+2;
                hour = hour.toString();
                if(hour.length === 1){
                    hour="0"+hour;
                }
            }
            return hour;
        }

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

        function formatDate(date){
            var split_index = date.indexOf('T');
            var full_date = date.slice(0,split_index);
            var full_time = date.slice(split_index+1,date.indexOf('.'));
            var month = full_date.slice(5,7);
            var year = full_date.slice(0,4);
            var day = full_date.slice(8,10);
            var hour = getHour(full_time.slice(0,2));
            var min = full_time.slice(3,5);
            var secs = full_time.slice(6,8)
            full_time = hour+":"+min+":"+secs;
            month = getMonth(month);
            date = day+" de "+month+" "+year+", "+full_time;
            return date;
        }

        function removeEstab(){
            vm.establishment = null;
            vm.commentaries = [];
            vm.votes = 0;
            vm.courses = [];
        }
    }