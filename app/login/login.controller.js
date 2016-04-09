/**
 * Created by Norman on 09/04/2016.
 */
angular
    .module('loginModule')
    .controller('LoginController', LoginController);

    LoginController.$inject = ['loginService'];

    function LoginController(loginService){
        var vm = this;

        vm.checkToken = checkToken;
        vm.isLoggedIn = isLoggedIn;
        vm.loggedIn = false;
        vm.login = login;
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
            if(localStorage.username !== undefined){
                vm.loggedIn = true;
                vm.name= localStorage.username;
                vm.role = localStorage.role;
            }
        }
        function login(email,pass,remember){
            loginService.getToken(email,pass).then(function(data){
                if(data.error){

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