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
        vm.getEstabs = getEstabs;
        vm.getSports = getSports;
        vm.id = 0;
        vm.imgFolder = server+"public/images/ests/";
        vm.querySearch = querySearch;
        vm.selectedSports = [];
        vm.searchCityChange = searchCityChange;
        vm.searchProvinceChange = searchProvinceChange;
        vm.sports = [];
        vm.view = 'listEstabs';



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
            if(view === 'assocSp'){
                getSports(id);
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

    }