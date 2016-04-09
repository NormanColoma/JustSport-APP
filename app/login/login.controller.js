/**
 * Created by Norman on 09/04/2016.
 */
angular
    .module('loginModule')
    .controller('LoginController', LoginController);

    LoginController.$inject = ['loginService', '$mdDialog', '$window','$location', '$http'];

    function LoginController(loginService, $mdDialog, $window, $location, $http){
        var vm = this;
        var url = $location.protocol()+"://"+$location.host()+":"+$location.port()+"/";

        vm.checkToken = checkToken;
        vm.isLoggedIn = isLoggedIn;
        vm.loggedIn = false;
        vm.login = login;
        vm.loginProgress = false;
        vm.logout = logout;
        vm.name = null;
        vm.role = null;

        isLoggedIn();

        function checkToken(){
            if(localStorage.expires <= Date.now()){
                return false;
            }
            return true;
        }

        function isLoggedIn(){
            if(loginService.isLoggedIn()){
                vm.loggedIn = true;
                vm.name= localStorage.username;
                vm.role = localStorage.role;
            }
        }
        function login(email,pass,remember, ev){
            vm.loginProgress = true;
            loginService.getToken(email,pass).then(function(data){
                if(data.error){
                    vm.loginProgress = false;
                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Login incorrecto')
                            .textContent('El email o la contraseña introducidos, no son correctos.')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('Listo')
                            .targetEvent(ev)
                    );
                }else{
                    if(remember){
                        localStorage.setItem("remember", true);
                        localStorage.setItem("password", pass);
                        localStorage.setItem("email", email);
                    }
                    localStorage.setItem("token", data.access_token);
                    localStorage.setItem("username", data.username);
                    localStorage.setItem("role", data.role);
                    localStorage.setItem("user_id", data.user_id);
                    localStorage.setItem("expires", data.expires);
                    vm.loggedIn = true;
                    vm.name = data.username;
                    vm.role = data.role;
                    $http.post(url+'token/'+data.access_token).then(function(data){
                        $window.location.href = url;
                    });
                }
            })
        }

        function logout(){
            vm.loggedIn = false;
            vm.name = null;
            vm.role = null;
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            localStorage.removeItem("role");
            localStorage.removeItem("user_id");
            localStorage.removeItem("expires");
            localStorage.removeItem("password");
            localStorage.removeItem("email");
        }
    }