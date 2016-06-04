/**
 * Created by Norman on 04/06/2016.
 */
angular
    .module('backOfficeModule')
    .directive('deleteEstab', deleteEstab);

deleteEstab.$inject = ['$mdDialog'];

function deleteEstab($mdDialog) {
    var directive = {
        restrict: 'EA',
        link: linkFunc,
    };

    return directive;

    function linkFunc(scope, el, attr, ctrl,ev) {
        el.on('click', function(){
            var id = parseInt(attr.name);
            console.log(id);
            var confirm = $mdDialog.confirm()
                .title('¿Quieres eliminar el establecimiento?')
                .textContent('Al eliminar el establecimiento, se eliminarán también todos sus cursos y horarios.')
                .ariaLabel('Delete Estab')
                .targetEvent(ev)
                .ok('Eliminar')
                .cancel('Cancelar');
            $mdDialog.show(confirm).then(function() {
                var estab = $("#estab-"+id);
                estab.fadeOut("normal", function() { $(this).remove(); } );
            }, function() {

            });
        });
    }
}