/**
 * Created by Norman on 29/03/2016.
 */
angular
    .module('homeModule')
    .controller('EstablishmentFilteredController', EstablishmentFilteredController);

    EstablishmentFilteredController.$inject = ['establishmentFilteredService', '$mdToast'];

    function EstablishmentFilteredController(establishmentFilteredService, $mdToast){
        var vm = this;

        vm.after= "none";
        vm.fetchMore = fetchMore;
        vm.items = [];
        vm.location = null;
        vm.selectedItemChange = selectedItemChange;
        vm.selectedLocationChange = selectedLocationChange;
        vm.sport = null;


        function fetchMore(){
            console.log(vm.sport.value);
            console.log(vm.location);
            /*establishmentFilteredService.getEstablishments(sport, location, vm.after).then(angular.bind(this, function (data) {
                if(data == "There no more rows to retrieve") {
                    $mdToast.show($mdToast.simple().textContent('No hay más establecimientos para la búsqueda introducida'));
                }else {
                    vm.after = data.paging.cursors.after;
                    vm.items = vm.items.concat(data.Establishments.rows);
                }
            }));*/
        }

        function selectedItemChange(item){
            if(item != undefined)
                vm.sport = establishmentFilteredService.getIndexOf(item.display);
        }

        function selectedLocationChange(item){
            if(item != undefined)
                vm.location = item.display;
        }
    }