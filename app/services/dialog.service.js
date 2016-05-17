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
            hideDialog: hideDialog,
            showCustomDialog: showCustomDialog,
            showDialog: showDialog
        };

        return service;

        function hideDialog(){
            $mdDialog.cancel();
        }
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

        /**
         * @name showCustomDialog
         * @desc It recieves the path of template, and load it into the dialog
         * @memberOf dialogService
         * @param ev-> Event captured
         * @param template-> The path to the custom template for the dialog
         * @return {void}
         */
        function showCustomDialog(ev,template){
            $mdDialog.show({
                templateUrl: template,
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
            });
        }
    }
