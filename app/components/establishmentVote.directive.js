/**
 * Created by Norman on 12/05/2016.
 */
angular
    .module('establishmentModule')
    .directive('establishmentVote', establishmentVote);

    establishmentVote.$inject = ['establishmentDetailsService', 'dialogService'];

    function establishmentVote(establishmentDetailsService,dialogService) {
        var directive = {
            restrict: 'EA',
            link: linkFunc,
            controller: EstablishmentDetailsController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl,ev) {
            el.on('click', function(){
                if(localStorage.token !== undefined) {
                    var id = parseInt(attr.id.substr(5, 6));
                    establishmentDetailsService.vote(id).then(function (data) {
                        if (data) {
                            var count = parseInt($('.like-cnt').text()) + 1;
                            $('.like-cnt').text(count);
                        }else{
                            var dataDialog = {
                                title: '¡Votación ya realizada!', text: 'No puedes votar más de una vez el mismo establecimiento',
                                aria: 'Vote User Alert', textButton: 'Listo'
                            };
                            dialogService.showDialog(dataDialog, ev);
                        }
                    });
                }else{
                    var dataDialog = {
                        title: 'Login Requerido', text: 'Para poder votar este establecimiento, primero debes loguearte.',
                        aria: 'Login User Alert', textButton: 'Listo'
                    };
                    dialogService.showDialog(dataDialog, ev);
                }
            });
        }
    }