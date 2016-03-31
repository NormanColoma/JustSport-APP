/**
 * Home Controller
 * @namespace Home
 */
angular
    .module('homeModule')
    .controller('HomeController', HomeController);

    HomeController.$inject = ['citySuggestionsService', '$http'];
    /**
     * @namespace HomeController
     * @desc Controller that manages the suggestions for locations and search establishments filtered
     * @memberOf Home
     */
    function HomeController(citySuggestionsService, $http){

        var vm = this;
        vm.querySearch = querySearch;

        function querySearch(query){
            return citySuggestionsService.getCities(query).then(function(data){
                return data;
            });
        }

    }


