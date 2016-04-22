/**
 * Register Controller
 * @namespace Register
 */
angular
    .module('registerModule')
    .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$location','registerUserService', 'dialogService'];


    /**
    *
    * @namespace RegisterController
    * @desc Controller that manages the registation of the user into the app
    * @memberOf Register
    */
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

        /**
         * @name changeView
         * @desc Change the view between login and register, and clean up the form passed
         * @memberOf RegisterController
         * @param form-> Login or register form
         * @return void
         */
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

        /**
         * @name register
         * @desc Registers the user into the app. If ok, it redirects the user to the login, and show info dialog. If not,
         * it will show alert dialog.
         * @memberOf RegisterController
         * @param ev-> Event captured
         * @return {void}
         */
        function register(ev){
            var dataDialog = {};
            if(vm.user !== undefined) {
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
                            title: '¡Cuenta existente!', text: 'No se ha podido crear su cuenta. El email '+vm.user.email+' ya está registrado.',
                            aria: 'Registered User Alert', textButton: 'Listo'
                        };
                        dialogService.showDialog(dataDialog, ev);
                    }
                });
            }
        }

        /**
         * @name resetForm
         * @desc Sets the form to its initial stateç
         * @memberOf RegisterController
         * @param form-> The form to be reseted
         * @return {void}
         */
        function resetForm(form){
            if(form !== undefined) {
                form.$setPristine();
                form.$setUntouched();
                vm.user = {};
            }
        }

        /**
         * @name selectView
         * @desc Redirects to register or login view
         * @memberOf RegisterController
         * @return {void}
         */
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

    }