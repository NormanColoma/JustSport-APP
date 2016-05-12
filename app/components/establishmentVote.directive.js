/**
 * Created by Norman on 12/05/2016.
 */
angular
    .module('establishmentModule')
    .directive('establishmentVote', establishmentVote);

    function establishmentVote() {
        var directive = {
            restrict: 'EA',
            link: linkFunc,
            controller: EstablishmentDetailsController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {

        }
    }