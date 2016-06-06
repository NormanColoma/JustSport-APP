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
                    if(file.size < 512000 && (file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/png")){
                        var img = $('.md-card-image-'+id);
                        var local_folder = "https://localhost:3000/public/images/ests/";
                        var server_folder = "https://justsport-api.herokuapp.com/public/images/ests/";
                        var server = server_folder;
                        var img_url = server+file.name;
                        backOfficeEstabService.uploadImg(file,id).then(function(res){
                            if(res){
                                img.attr('src',img_url);
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
                            text: 'La imagen debe ser de tipo jpg o png, y no puede pesar más de 512Kb.',
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