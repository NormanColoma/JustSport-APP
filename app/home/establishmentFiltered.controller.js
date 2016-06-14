/**
 * Establishment filtered controller
 * @namespace Home
 */
angular
    .module('homeModule')
    .controller('EstablishmentFilteredController', EstablishmentFilteredController);

    EstablishmentFilteredController.$inject = ['establishmentFilteredService', 'dialogService', 'getScheduleService'];

    /**
     *
     * @namespace EstablishmentFilteredController
     * @desc Controller that fetch the establishment that match the filter
     * @memberOf Home
     *
     */
    function EstablishmentFilteredController(establishmentFilteredService, dialogService, getScheduleService){
            var vm = this;
            var local_folder = "https://localhost:3000/";
            var server_folder = "https://justsport-api.herokuapp.com/";
            var server = server_folder;

            vm.activated = true;
            vm.addItems = addItems;
            vm.after= "none";
            vm.fetchMore = fetchMore;
            vm.imgFolder = server+"public/images/ests/";
            vm.items = [];
            vm.location = null;
            vm.prevLocation = null;
            vm.prevSport = null;
            vm.searchItem = searchItem;
            vm.selectedItemChange = selectedItemChange;
            vm.selectedLocationChange = selectedLocationChange;
            vm.shortenDesc = shortenDesc;
            vm.sport = null;


            function addItems(items){
                if(vm.items.length > 0) {
                    var add = false;
                    for (var i = 0; i < items.length; i++) {
                        if(!searchItem(items[i]))
                            vm.items = vm.items.concat(items[i]);
                    }
                }else{
                    vm.items = vm.items.concat(items);
                }
            }
            /**
             * @name fetchMore
             * @desc Fetch more establishments. Furthermore it shows alerts if needed
             * @param ev. Event captured
             * @memberOf Home.EstablishmentFilteredController
             * @returns {void}
             */
            function fetchMore(ev){
                var dataDialog = {};
                vm.activated = false;
                if(vm.prevLocation != vm.location || vm.prevSport != vm.sport){
                    vm.items = [];
                    vm.after = "none";
                }
                establishmentFilteredService.getEstablishments(vm.sport, vm.location, vm.after).then(angular.bind(this, function (data) {
                    if(data === "There no more rows to retrieve") {
                        vm.activated = true;
                    }else if(data === "There are no establishments that match the current filter"){
                        vm.activated = true;
                        if(vm.after === "none") {
                            dataDialog = {
                                title: 'Sin resultados',
                                text: 'No se han encontrado establecimientos para la búsqueda introducida.',
                                aria: 'Establishment Dialog',
                                textButton: 'Listo'
                            };
                            dialogService.showDialog(dataDialog, ev);
                        }
                        vm.after = "none";
                    }else {
                        getScheduleService.setSport(vm.sport);
                        vm.activated = true;
                        vm.after = data.paging.cursors.after;
                        addItems(data.Establishments.rows);
                        vm.prevLocation = vm.location;
                        vm.prevSport = vm.sport;
                    }
                }));
            }

            function searchItem(item){
                var found = false;
                for (var i = 0; i < vm.items.length; i++) {
                    if(vm.items[i].id === item.id){
                        found = true;
                        break;
                    }
                }
                return found;
            }

            /**
             * @name selectedItemChange
             * @desc Get the index of sport passed, and set the sport attribute
             * @param item. The name of the sport selected
             * @memberOf Home.EstablishmentFilteredController
             * @returns {void}
             */
            function selectedItemChange(item){
                if(item !== undefined)
                    vm.sport = establishmentFilteredService.getIndexOf(item.display);
            }

            /**
             * @name selectedLocationChange
             * @desc Set the location attribute
             * @param item. The location selected
             * @memberOf Home.EstablishmentFilteredController
             * @returns {void}
             */
            function selectedLocationChange(item){
                if(item !== undefined)
                    vm.location = item;
            }

            /**
             * @name shortenDesc
             * @desc Shorten the description of establishment, if it is longer than 200 characters
             * @param desc. The description of the establishment to be shorten
             * @memberOf Home.EstablishmentFilteredController
             * @returns {String}
             */
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