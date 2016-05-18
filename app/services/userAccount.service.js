/**
 * Created by Norman on 18/05/2016.
 */
angular
    .module('userAccountModule')
    .factory('userAccountService', userAccountService);

    userAccountService.$inject = ['$resource'];

    function userAccountService($resource){
        var local_api = "https://localhost:3000/api";
        var server_api = "https://justsport-api.herokuapp.com/api";
        var server = local_api;

        var Account = $resource(server+'/users/:id', {id:'@id'},{
                query: {
                    isArray:false,
                    method: 'GET'
                },
                delete:{
                    method: 'DELETE',
                    url: server + '/users/:id',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token
                    }
                },
                update:{
                    method: 'PUT',
                    url: server + '/users/:id',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.token
                    }
                }
            }
        );

        var service = {
            closeAccount: closeAccount,
            getUser: getUser,
            updateAccount: updateAccount
        };

        return service;

        function closeAccount(id){
            return Account.delete({id: id}).$promise
                .then(closeAccountSuccess)
                .catch(closeAccountFailed);

            function closeAccountSuccess(){
                return true;
            }

            function  closeAccountFailed(){
                return false;
            }
        }

        function getUser(id){
            return Account.get({id: id}).$promise
                .then(getUserSuccess)
                .catch(getUserFailed);

            function getUserSuccess(data){
                var user = {name: data.name, lname: data.lname, role: data.role, gender: data.gender, img: data.img};
                return user;
            }

            function  getUserFailed(error){
                var message = {message: "An error occurred"};
                return message;
            }
        }

        function updateAccount(id,data){
            return Account.update({id:id}, data).$promise
                .then(updateAccountSuccess)
                .catch(updateAccountFailed);

            function updateAccountSuccess(){
                return true;
            }

            function updateAccountFailed(){
                return false;
            }
        }
    }