/**
 * Created by Norman on 22/05/2016.
 */
/**
* Back Office Estab Controller
* @namespace BackOffice Estabs
*/
angular
    .module('backOfficeModule')
    .controller('BackOfficeEstabController', BackOfficeEstabController);

    BackOfficeEstabController.$inject = ['backOfficeEstabService', 'dialogService', 'loginService','citySuggestionsService',
        'formResetService', 'backOfficeSportService'];

    /**
    *
    * @namespace BackOfficeEstabController
    * @desc Controller that manages the operations related to establishments in the backoffice
    * @memberOf BackOffice Estabs
    *
    */
    function BackOfficeEstabController(backOfficeEstabService, dialogService, loginService, citySuggestionsService,
                                       formResetService, backOfficeSportService) {
        var vm = this;

        var local_folder = "https://localhost:3000/";
        var server_folder = "https://justsport-api.herokuapp.com/";
        var server = local_folder;


        vm.addEstablishment = addEstablishment;
        vm.addSport = addSport;
        vm.associateSport = associateSport;
        vm.after = "none";
        vm.changeView = changeView;
        vm.currentSports = [];
        vm.estabs = [];
        vm.getEstab = getEstab;
        vm.getEstabs = getEstabs;
        vm.getSports = getSports;
        vm.id = 0;
        vm.imgFolder = server+"public/images/ests/";
        vm.querySearch = querySearch;
        vm.selectedSports = [];
        vm.searchCityChange = searchCityChange;
        vm.searchProvinceChange = searchProvinceChange;
        vm.selectedEst = null;
        vm.sports = [];
        vm.view = 'listEstabs';
        vm.updateEstab = updateEstab;



        /**
         * @name addEstablishment
         * @desc Add new establishment and push it to the array of estabs
         * @param data. Information about the new establishment
         * @param ev. Even captured
         * @memberOf BackOffice Estabs.BackOfficeEstabController
         * @returns {void}
         */
        function addEstablishment(data,ev, form){
            vm.estab.owner = localStorage.user_id;
            vm.estab.main_img = 'default.jpg';
            var dataDialog = {};
            backOfficeEstabService.addEstablishment(data).then(function(data){
                if(data.message === undefined){
                    vm.estabs.push(data);
                    formResetService.reset(form);
                    vm.estab = {};
                    vm.searchText = null;
                    vm.searchTextProvince = null;
                    dataDialog = {
                        title: '¡Establecimiento Añadido!', text: 'El establecimiento ha sido añadido correctamente.',
                        aria: 'Estab Added Alert', textButton: 'Listo'
                    };
                    changeView('listEstabs');
                    dialogService.showDialog(dataDialog, ev);
                }else{
                    dataDialog = {
                        title: '¡Erro al Añadir!', text: 'El establecimiento no se ha podido añadir. ' +
                        'Por favor, vuelve a intentar añadir el mismo.',
                        aria: 'Estab Added Alert Failed', textButton: 'Listo'
                    };
                }
            });
        }

        /**
         * @name associateSport
         * @desc Impart a list of sport in the establishment
         * @param id. Id of establishment
         * @param sps. Array of sports that are going to be imparted
         * @param ev. Event captured
         * @memberOf BackOffice Estabs.BackOfficeEstabController
         * @returns {void}
         */
        function associateSport(id,sps, ev){
            var dataDialog = {};
            if(sps.length === 0){
                dataDialog = {
                    title: 'Selecciona un Deporte', text: 'Debes seleccionar como mínimo un deporte.',
                    aria: 'Estab Added Alert', textButton: 'Listo'
                };
                dialogService.showDialog(dataDialog, ev);
            }else{
                for(var i=0;i<sps.length;i++){
                     var data = {id: sps[i].id};
                     var sp = sps[i];
                     addSport(id,data, sp);
                 }
                 vm.selectedSports = [];
                 if(vm.sports.length > 0){
                     dataDialog = {
                         title: 'Deportes ya impartidos', text: 'Los deportes seleccionados ya están impartidos para este establecimiento',
                         aria: 'Sport Added Alert', textButton: 'Listo'
                     };

                     dialogService.showDialog(dataDialog, ev);
                 }else{
                     dataDialog = {
                         title: 'Deportes Impartidos', text: 'Los deportes se han impartido correctamente',
                         aria: 'Sport Added Alert', textButton: 'Listo'
                     };
                     dialogService.showDialog(dataDialog, ev);
                 }
            }
        }

        /**
         * @name addSport
         * @desc Impart new sport in the establishment
         * @param id. Id of establishment
         * @param data. Sport to be imparted
         * @param sp. Sport object that will be pushed to currentSports array
         * @memberOf BackOffice Estabs.BackOfficeEstabController
         * @returns {void}
         */
        function addSport(id,data,sp){
            backOfficeSportService.associateSp(id,data).then(function(result){
                if(result) {
                    vm.sports.push(sp);
                    vm.currentSports.push(sp);
                }
            });
        }

        /**
         * @name changeView
         * @desc Change between the list view or add view
         * @param view. The name of the view to be loaded
         * @memberOf BackOffice Estabs.BackOfficeEstabController
         * @returns {void}
         */
        function changeView(view,id){
            vm.view = view;
            vm.id = id;
            vm.selectedItem = null;
            vm.searchText = null;
            vm.selectedItemProvince = null;
            vm.searchTextProvince = null;
            if(view === 'assocSp'){
                getSports(id);
            }else if(view === 'updateEstab'){
                getEstab(id);
            }
        }

        function getEstab(id){
            for(var i=0;i<vm.estabs.length;i++){
                if(vm.estabs[i].id === id){
                    vm.selectedEst = angular.copy(vm.estabs[i]);
                    vm.selectedItem = vm.estabs[i].city;
                    vm.searchText = vm.estabs[i].city;
                    vm.selectedItemProvince = vm.estabs[i].province;
                    vm.searchTextProvince = vm.estabs[i].province;
                }
            }
        }

        /**
         * @name getEstabs
         * @desc Fetch the establishments that belong to owner
         * @param ev. Even captured
         * @memberOf BackOffice Estabs.BackOfficeEstabController
         * @returns {void}
         */
        function getEstabs(ev){
            if(loginService.isLoggedIn()) {
                backOfficeEstabService.getEstabs(vm.after).then(angular.bind(this, function (data) {
                    vm.after = data.paging.cursors.after;
                    for(var i=0;i<data.Establishments.length;i++){
                        for(var j=0;j<vm.estabs.length;j++){
                            if(vm.estabs[j].name === data.Establishments[i].name){
                                data.Establishments.splice(i,1);
                            }
                        }
                    }
                    vm.estabs = vm.estabs.concat(data.Establishments);
                }));
            }
        }

        /**
         * @name getSports
         * @desc Fetch the current sports which are being imparted in the estab
         * @param id. The id of the establishment
         * @memberOf BackOffice Estabs.BackOfficeEstabController
         * @returns {void}
         */
        function getSports(id){
            backOfficeSportService.getSports(id).then(function(data){
                vm.currentSports = data;
            });

        }

        /**
         * @name querySearch
         * @desc Search the city using google services
         * @param query. The name of the city
         * @memberOf BackOffice Estabs.BackOfficeEstabController
         * @returns {Array}
         */
        function querySearch(query){
            return citySuggestionsService.getCities(query).then(function(data){
                return data;
            });
        }

        /**
         * @name searchCityChange
         * @desc Sets the city of the establishment once is selected
         * @param city. The name of the city
         * @memberOf BackOffice Estabs.BackOfficeEstabController
         * @returns {void}
         */
        function searchCityChange(city){
            vm.estab.city = city;
        }

        /**
         * @name searchProvinceChange
         * @desc Sets the province of the establishment once is selected
         * @param province. The name of the province
         * @memberOf BackOffice Estabs.BackOfficeEstabController
         * @returns {void}
         */
        function searchProvinceChange(province){
            vm.estab.province = province;
        }

        /**
         * @name updateEstab
         * @desc Update the values of establsihment
         * @param id. Id of establishment
         * @param data. New establishment values
         * @param ev. Event captured
         * @param form. Form to be cleaned
         * @memberOf BackOffice Estabs.BackOfficeEstabController
         * @returns {void}
         */
        function updateEstab(id,data,ev,form){
            var dataDialog = {};
            var new_est = data;
            data.owner = localStorage.user_id;
            backOfficeEstabService.updateEstablishment(id,data).then(function(res){
                if(res){
                    for(var i=0;i<vm.estabs.length;i++){
                        if(vm.estabs[i].id === id){
                            delete new_est.owner;
                            vm.estabs[i] = new_est;
                        }
                    }
                    dataDialog = {
                        title: '¡Establecimiento Actualizadp!', text: 'La información del establecimiento ha sido actualizada.',
                        aria: 'Estab Updated Alert', textButton: 'Listo'
                    };
                    changeView('listEstabs');
                    dialogService.showDialog(dataDialog, ev);
                }else{
                    dataDialog = {
                        title: '¡Error durante la Actualización!', text: 'Se ha producido un error durante la actualziación. Por favor, inténtalo de nuevo.',
                        aria: 'Estab Failed Alert', textButton: 'Listo'
                    };
                    dialogService.showDialog(dataDialog, ev);
                }
            });
        }
    }