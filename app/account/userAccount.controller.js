/**
 * Created by Norman on 19/05/2016.
 */

angular
    .module('userAccountModule')
    .controller('UserAccountController', UserAccountController);

    UserAccountController.$inject = ['userAccountService','formResetService', 'dialogService', '$scope'];

    function UserAccountController(userAccountService,formResetService, dialogService, $scope){
        var vm=this;
        var local_folder = "https://localhost:3000/";
        var server_folder = "https://justsport-api.herokuapp.com/";
        var server = local_folder;

        vm.account = {};
        vm.closeAccount = closeAccount;
        vm.closed = false;
        vm.getUser = getUser;
        $scope.imgFolder = server+"public/images/users/";
        vm.updateAccount = updateAccount;
        vm.uploadImg = uploadImg;
        vm.updated = false;
        vm.user = {};
        vm.user_id = localStorage.user_id;

        function uploadImg(file,ev){
            var dataDialog={};
            userAccountService.uploadImg(file).then(function(data){
                if(data){
                    $scope.imgFolder = server+"public/images/users/"+file.name;
                    dataDialog = {
                        title: '¡Imagen Subida!', text: 'Tu nueva imagen de perfil ha sido actualizada',
                        aria: 'Updated IMG User Alert', textButton: 'Listo'
                    };
                    dialogService.showDialog(dataDialog, ev);
                }else{

                }
            });
        }

        function closeAccount(id){
            userAccountService.closeAccount(id).then(function(data){
                vm.closed = data;
                if(data){

                }else{

                }
            });
        }

        function getUser(){
            userAccountService.getUser(vm.user_id).then(function (user) {
                if(user.message === undefined){
                    if(user.role === "owner"){
                        vm.account.role = "Propietario";
                    }else{
                        vm.account.role = "Usuario";
                    }
                    vm.user = user;
                    $scope.imgFolder = $scope.imgFolder+vm.user.img;
                }else{

                }
            });
        }

        function updateAccount(data,form,ev){
            if(data.pass != undefined && vm.acc.current !== undefined) {
                var dataDialog = {};
                var data_updated = data;
                var role = data.role;
                if (data_updated.role === "Usuario")
                    data_updated.role = "user";
                else
                    data_updated.role = "owner";
                userAccountService.updateAccount(vm.user_id, data_updated).then(function (data) {
                    if (data) {
                        vm.updated = true;
                        formResetService.reset(form);
                        vm.account = {role: role};
                        vm.acc = {};
                        dataDialog = {
                            title: '¡Información Actualizada!', text: 'Tu cuenta ha sido actualizada ' + vm.user.name,
                            aria: 'Updated User Alert', textButton: 'Listo'
                        };
                        dialogService.showDialog(dataDialog, ev);
                    } else {
                        vm.updated = false;
                        dataDialog = {
                            title: '¡Error!',
                            text: 'Se ha encontrado un error durante la actualización. Por favor, intentalo de nuevo',
                            aria: 'Updated User Error Alert',
                            textButton: 'Listo'
                        };
                        dialogService.showDialog(dataDialog, ev);
                    }
                });
            }
        }
    }