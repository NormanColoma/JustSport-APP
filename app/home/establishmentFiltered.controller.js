/**
 * Created by Norman on 29/03/2016.
 */
angular
    .module('homeModule')
    .controller('EstablishmentFilteredController', EstablishmentFilteredController);

    EstablishmentFilteredController.$inject = ['establishmentFilteredService', '$mdToast', '$mdDialog'];

    function EstablishmentFilteredController(establishmentFilteredService, $mdToast, $mdDialog){
        var vm = this;
        var local_folder = "https://localhost:3000/";
        var server_folder = "https://justsport-api.herokuapp.com/";
        var server = local_folder;

        vm.activated = true;
        vm.after= "none";
        vm.fetchMore = fetchMore;
        vm.imgFolder = server+"public/images/ests/";
        vm.items = [];
        vm.location = null;
        vm.prevLocation = null;
        vm.prevSport = null;
        vm.selectedItemChange = selectedItemChange;
        vm.selectedLocationChange = selectedLocationChange;
        vm.shortenDesc = shortenDesc;
        vm.sport = null;


        function fetchMore(ev){
            vm.activated = false;
            if(vm.prevLocation != vm.location || vm.prevSport != vm.sport){
                vm.items = [];
                vm.after = "none";
            }
            establishmentFilteredService.getEstablishments(vm.sport, vm.location, vm.after).then(angular.bind(this, function (data) {
                if(data === "There no more rows to retrieve") {
                    vm.activated = true;
                   // $mdToast.show($mdToast.simple().textContent('No hay más establecimientos para la búsqueda introducida'));
                }else if(data === "There are no establishments that match the current filter"){
                    vm.activated = true;
                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('¡Sin resultados!')
                            .textContent('No se han encontrado establecimientos para la búsqueda introducida.')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('Listo')
                            .targetEvent(ev)
                    );
                }else {
                    vm.activated = true;
                    vm.after = data.paging.cursors.after;
                    vm.items = vm.items.concat(data.Establishments.rows);
                    vm.prevLocation = vm.location;
                    vm.prevSport = vm.sport;
                }
            }));
        }

        function selectedItemChange(item){
            if(item != undefined)
                vm.sport = establishmentFilteredService.getIndexOf(item.display);
        }

        function selectedLocationChange(item){
            if(item != undefined)
                vm.location = item;
        }

        function shortenDesc(desc){
            var short = desc;
            if(desc.length > 200) {
                short = desc.slice(0, 200);
                if(short[199] != ".")
                    short+="...";
                else
                    short+="..";
            }
            return short;
        }
    }