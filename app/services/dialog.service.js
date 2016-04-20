/**
 * Created by Norman on 19/04/2016.
 */
/**
 * Created by Norman on 17/04/2016.
 */
angular
    .module('justSport')
    .factory('dialogService', dialogService);

    dialogService.$inject = ['$mdDialog'];

    function dialogService($mdDialog){
        var service = {
            showDialog: showDialog
        };

        return service;

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
