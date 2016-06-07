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

        function addSport(sport,form,ev){
            var dataDialog = {};
            var d = {name: sport};
            backOfficeSportService.addSp(d).then(function(data){
                if(data.name){
                    vm.sport = data;
                    formResetService.reset(form);
                    vm.sp = {};
                    dataDialog = {
                        title: '¡Deporte Añadido!', text: 'El deporte con nombre "'+sport+'" ha sido añadido correctamente.',
                        aria: 'Added Sp Alert', textButton: 'Listo'
                    };
                    dialogService.showDialog(dataDialog, ev);
                }else{
                    dataDialog = {
                        title: '¡Deporte Añadido!', text: 'El deporte con nombre "'+sport+'" ya existe en JustSport.',
                        aria: 'Added Sp Alert Failed', textButton: 'Listo'
                    };
                    dialogService.showDialog(dataDialog, ev);
                }
            });
        }
    }