/**
 * Created by Norman on 20/05/2016.
 */
angular
    .module('userAccountModule')
    .directive('uploadBtn', uploadBtn);


function uploadBtn() {
    var directive = {
        estrict: 'EA',
        link: link,
        controller: UserAccountController,
        controllerAs: 'vm',
        bindToController: true
    };
    return directive;

    function link(scope, element, attrs,ctrl,ev) {
        var input = $('#fileInput');
        var profile= $('#userProfileImg');
        element.on('click', function(){
            input.click();
            input.bind('change', function() {
                if(input.get(0).files.length > 0){
                    var file = input.get(0).files[0];
                    ctrl.uploadImg(file,ev);
                }
            });
        });
    }
}