/**
 * Created by Norman on 15/04/2016.
 */
angular
    .module('registerModule')
    .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$location','registerUserService', 'dialogService'];


    function RegisterController($location, registerUserService, dialogService){
        var vm = this;
        var base_api = 'https://localhost:3000/api/';


        vm.changeView = changeView;
        vm.register = register;
        vm.registered = true;
        vm.registerView = false;
        vm.registeringUser = false;
        vm.resetForm = resetForm;
        vm.selectView = selectView;

        selectView();

        function changeView(form){
            if(!vm.registerView) {
                vm.registerView = true;
                $location.path('/register');
            }
            else {
                vm.registerView = false;
                $location.path('/login');
            }
            resetForm(form);
        }

        function register(ev){
            if(vm.user.email !== undefined && vm.user.password !== undefined && vm.user.name !== undefined &&
                vm.user.lname !== undefined && vm.user.gender !== undefined) {
                var dataDialog = {};
                vm.registeringUser = true;
                if (vm.user.role !== undefined)
                    vm.user.role = 'owner';
                else
                    vm.user.role = 'user';
                registerUserService.registerUser(vm.user).then(function (data) {
                    if (data === true) {
                        vm.registered = true;
                        vm.registeringUser = false;
                        vm.registerView = false;
                        $location.path('/login');
                        dataDialog = {
                            title: '¡Bienvenido!', text: 'Su cuenta se ha creado correctamente.',
                            aria: 'Registered User Alert', textButton: 'Listo'
                        };
                        dialogService.showDialog(dataDialog, ev);
                    } else {
                        vm.registered = false;
                        vm.registeringUser = false;
                        dataDialog = {
                            title: '¡Cuenta existente!',
                            text: 'No se ha podido crear su cuenta. El email ' + vm.user.email + ' ya está registrado.',
                            aria: 'Registered User Alert',
                            textButton: 'Listo'
                        };
                        dialogService.showDialog(dataDialog, ev);
                    }
                });
            }
        }

        function resetForm(form){
            if(form !== undefined) {
                form.$setPristine();
                form.$setUntouched();
                vm.user = {};
            }
        }

        function selectView(){
            var path = $location.path();
            if(path === '/register'){
                vm.registerView = true;
            }else if(path === ''){
                $location.path('/login');
            }
            else{
                vm.registerView = false;
            }
        }

        function userIsNull(){

        }

    }