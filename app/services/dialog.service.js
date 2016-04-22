/**
 * Dialog Service
 * @namespace Services
 */
angular
    .module('justSport')
    .factory('dialogService', dialogService);

    dialogService.$inject = ['$mdDialog'];

    /**
     * @namespace dialogService
     * @desc Service which handles the dialogs of the app
     * @memberOf Services
     */
    function dialogService($mdDialog){
        var service = {
            showDialog: showDialog
        };

        return service;

        /**
         * @name showDialog
         * @desc Prompts the dialog
         * @memberOf dialogService
         * @param data-> JSON Object that contains the info to be prompted by the dialog
         * @param ev-> Event captured
         * @return {void}
         */
        function showDialog(data,ev){
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title(data.title)
                    .textContent(data.text)
                    .ariaLabel(data.aria)
                    .ok(data.textButton)
                    .targetEvent(ev)
            );
        }
    }
