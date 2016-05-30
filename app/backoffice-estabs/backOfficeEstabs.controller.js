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

    BackOfficeEstabController.$inject = ['backOfficeEstabService', 'dialogService', 'loginService','citySuggestionsService'];

    /**
    *
    * @namespace BackOfficeEstabController
    * @desc Controller that manages the operations related to establishments in the backoffice
    * @memberOf BackOffice Estabs
    *
    */
    function BackOfficeEstabController(backOfficeEstabService, dialogService, loginService, citySuggestionsService) {
        var vm = this;

        var local_folder = "https://localhost:3000/";
        var server_folder = "https://justsport-api.herokuapp.com/";
        var server = local_folder;

        vm.addEstablishment = addEstablishment;
        vm.after = "none";
        vm.changeView = changeView;
        vm.city = "";
        vm.estabs = [];
        vm.getEstabs = getEstabs;
        vm.imgFolder = server+"public/images/ests/";
        vm.province = "";
        vm.querySearch = querySearch;
        vm.searchCityChange = searchCityChange;
        vm.searchProvinceChange = searchProvinceChange;
        vm.view = 'listEstabs';



        /**
         * @name addEstablishment
         * @desc Add new establishment and push it to the array of estabs
         * @param data. Information about the new establishment
         * @param ev. Even captured
         * @memberOf BackOffice Estabs.BackOfficeEstabController
         * @returns {void}
         */
        function addEstablishment(data,ev){
            if(vm.estab !== undefined){
                backOfficeEstabService.addEstablishment(data).then(function(data){
                    if(data.message === undefined){
                        vm.estabs.push(data);
                    }else{

                    }
                });
            }
        };

        function changeView(view){
            vm.view = view;
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
                    vm.estabs = vm.estabs.concat(data.Establishments);
                }));
            }
        }

        function querySearch(query){
            return citySuggestionsService.getCities(query).then(function(data){
                return data;
            });
        }

        function searchCityChange(city){
            vm.city = city;
        }

        function searchProvinceChange(province){
            vm.province = province;
        }

    }