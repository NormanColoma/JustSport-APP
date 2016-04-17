/**
 * Created by Norman on 15/04/2016.
 */
angular
    .module('registerModule')
    .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$mdDialog','$location','registerUserService'];


    function RegisterController($mdDialog, $location, registerUserService){
        var vm = this;
        var base_api = 'https://localhost:3000/api/';


        vm.changeView = changeView;
        vm.register = register;
        vm.registered = true;
        vm.registerView = false;
        vm.registeringUser = false;
        vm.resetForm = resetForm;

        function changeView(form){
            if(!vm.registerView)
                vm.registerView = true;
            else
                vm.registerView = false;
            resetForm(form);
        }

        function register(ev){
            vm.registeringUser = true;
            if(vm.user.role === true)
                vm.user.role = 'owner';
            else
                vm.user.role = 'user';
            registerUserService.registerUser(vm.user).then(function(data){
                if(data === true){
                    vm.registered = true;
                    vm.registeringUser = false;
                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('¡Bienvenido!')
                            .textContent('Su cuenta se ha creado correctamente.')
                            .ariaLabel('Registered User Alert')
                            .ok('Listo')
                            .targetEvent(ev)
                    );
                }else{
                    vm.registered = false;
                    vm.registeringUser = false;
                }
            });
        }

        function resetForm(form){
            if(form !== undefined) {
                form.$setPristine();
                form.$setUntouched();
                vm.user = {};
            }
        }

    }