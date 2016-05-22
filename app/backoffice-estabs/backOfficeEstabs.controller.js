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

    BackOfficeEstabController.$inject = ['backOfficeEstabService', 'dialogService', 'loginService'];

    /**
    *
    * @namespace BackOfficeEstabController
    * @desc Controller that manages the operations related to establishments in the backoffice
    * @memberOf BackOffice Estabs
    *
    */
    function BackOfficeEstabController(backOfficeEstabService, dialogService, loginService) {
        var vm = this;

        var local_folder = "https://localhost:3000/";
        var server_folder = "https://justsport-api.herokuapp.com/";
        var server = local_folder;

        vm.addEstablishment = addEstablishment;
        vm.after = "none";
        vm.estabs = [];
        vm.getEstabs = getEstabs;
        vm.imgFolder = server+"public/images/ests/";


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

    }