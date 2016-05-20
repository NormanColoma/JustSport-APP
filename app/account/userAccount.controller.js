/**
 * Created by Norman on 19/05/2016.
 */

angular
    .module('userAccountModule')
    .controller('UserAccountController', UserAccountController);

    UserAccountController.$inject = ['userAccountService','formResetService', 'dialogService'];

    function UserAccountController(userAccountService,formResetService, dialogService){
        var vm=this;
        var local_folder = "https://localhost:3000/";
        var server_folder = "https://justsport-api.herokuapp.com/";
        var server = local_folder;

        vm.account = {};
        vm.closeAccount = closeAccount;
        vm.closed = false;
        vm.getUser = getUser;
        vm.imgFolder = server+"public/images/users/";
        vm.updateAccount = updateAccount;
        vm.updated = false;
        vm.user = {};
        vm.user_id = localStorage.user_id;


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
                }else{

                }
            });
        }

        function updateAccount(data,form,ev){
            var dataDialog = {};
            var data_updated = data;
            var role = data.role;
            if(data_updated.role === "Usuario")
                data_updated.role = "user";
            else
                data_updated.role = "owner";
           userAccountService.updateAccount(vm.user_id,data_updated).then(function(data){
                if(data){
                    vm.updated = true;
                    formResetService.reset(form);
                    vm.account = {role:role};
                    vm.acc = {};
                    dataDialog = {
                        title: '¡Información Actualizada!', text: 'Tu cuenta ha sido actualizada '+vm.user.name,
                        aria: 'Updated User Alert', textButton: 'Listo'
                    };
                    dialogService.showDialog(dataDialog, ev);
                }else{
                    vm.updated = false;
                    dataDialog = {
                        title: '¡Error!', text: 'Se ha encontrado un error durante la actualización. Por favor, intentalo de nuevo',
                        aria: 'Updated User Error Alert', textButton: 'Listo'
                    };
                    dialogService.showDialog(dataDialog, ev);
                }
            });
        }
    }