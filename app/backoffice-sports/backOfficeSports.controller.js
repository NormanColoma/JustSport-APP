/**
 * Created by Norman on 07/06/2016.
 */

/**
 * Back Office Sport Controller
 * @namespace BackOffice Sports
 */
angular
    .module('backOfficeModule')
    .controller('BackOfficeSportController', BackOfficeSportController);

    BackOfficeSportController.$inject = ['dialogService', 'formResetService', 'backOfficeSportService'];

    /**
     *
     * @namespace BackOfficeSportController
     * @desc Controller that manages the operations related to sports from backoffice
     * @memberOf BackOffice Sports
     *
     */
    function BackOfficeSportController(dialogService,formResetService, backOfficeSportService) {
        var vm = this;

        vm.addSport = addSport;
        vm.sport = {};

        function addSport(sport){
            backOfficeSportService.addSp(sport).then(function(data){
                if(data.name){
                    vm.sport = data;
                }else{

                }
            });
        }
    }