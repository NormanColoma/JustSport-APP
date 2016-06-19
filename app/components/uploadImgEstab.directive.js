/**
 * Created by Norman on 06/06/2016.
 */
angular
    .module('backOfficeModule')
    .directive('uploadEstBtn', uploadEstBtn);

uploadEstBtn.$inject = ['dialogService','backOfficeEstabService'];

function uploadEstBtn(dialogService,backOfficeEstabService) {
    var directive = {
        estrict: 'EA',
        link: link,
    };
    return directive;

    function link(scope,element, attrs,ev) {
        element.on('click', function(){
            var id= attrs.name;
            var input = $('#img-estab-btn-'+id);
            var dataDialog = {};
            input.change(function() {
                if(input.get(0).files.length > 0){
                    var file = input.get(0).files[0];
                    if(file.size < 512000){
                        var img = $('.md-card-image-'+id);
                        backOfficeEstabService.uploadImg(file,id).then(function(res){
                            if(res.status === "ok"){
                                img.attr('src',res.url);
                                dataDialog = {
                                    title: '¡Imagen Subida!',
                                    text: 'La imagen de perfil del establecimiento, se ha subido correctamente.',
                                    aria: 'Updated Estab Img Alert',
                                    textButton: 'Listo'
                                };
                                dialogService.showDialog(dataDialog, ev);
                            }
                        });
                    }else{
                        input.val('');
                        dataDialog = {
                            title: '¡Error!',
                            text: 'La imagen no puede pesar más de 512Kb.',
                            aria: 'Updated Estab Img Error Alert',
                            textButton: 'Listo'
                        };
                        dialogService.showDialog(dataDialog, ev);
                    }

                }
            });
        });
    }
}