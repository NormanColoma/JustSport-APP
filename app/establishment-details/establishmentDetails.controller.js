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
        vm.establishment = {};
        vm.getEstablishment = getEstablishment;
        vm.votes = 0;

        function getEstablishment(id){
            establishmentDetailsService.getEstablishment(id).then(function(data){
                if(data === "There was an error when loading establishment"){

                }else{
                    vm.establishment.id = data.id;
                    vm.establishment.name = data.name;
                    vm.establishment.desc = data.desc;
                    vm.establishment.city = data.city;
                    vm.establishment.province = data.province;
                    vm.establishment.addr = data.addr;
                    vm.establishment.phone = data.phone;
                    vm.establishment.website = data.website;
                    vm.establishment.main_img = data.main_img;
                    vm.commentaries = data.Commentaries;
                    vm.votes = data.Votes.length;
                }
            });
        }

    }