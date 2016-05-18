/**
 * Created by Norman on 19/05/2016.
 */

angular
    .module('userAccountModule')
    .controller('UserAccountController', UserAccountController);

    UserAccountController.$inject = ['userAccountService'];

    function UserAccountController(userAccountService){
        var vm=this;

        vm.closeAccount = closeAccount;
        vm.closed = false;
        vm.getUser = getUser;
        vm.updateAccount = updateAccount;
        vm.updated = false;
        vm.user = {};

        function closeAccount(id){
            userAccountService.closeAccount(id).then(function(data){
                vm.closed = data;
                if(data){

                }else{

                }
            });
        }

        function getUser(id){
            userAccountService.getUser(id).then(function (user) {
                if(user.message === undefined){
                    vm.user = user;
                }else{

                }
            });
        }

        function updateAccount(id,data){
            userAccountService.updateAccount(id,data).then(function(data){
                vm.updated = data;
                if(data){

                }else{

                }
            });
        }
    }