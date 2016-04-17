/**
 * Created by Norman on 15/04/2016.
 */
angular
    .module('loginModule')
    .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$mdDialog', '$window','$location', '$http'];


    function RegisterController($location){
        var vm = this;
        var base_api = 'https://localhost:3000/api/';


        vm.changeView = changeView;
        vm.registerView = false;
        vm.resetForm = resetForm;

        function changeView(form){
            if(!vm.registerView)
                vm.registerView = true;
            else
                vm.registerView = false;
            resetForm(form);
        }

        function resetForm(form,user,account){
            if(form !== undefined) {
                form.$setPristine();
                form.$setUntouched();
                vm.user = {};
            }
        }

    }