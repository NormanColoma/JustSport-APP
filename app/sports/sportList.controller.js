/**
 * Sport List Controller
 * @namespace Sports
 */
angular
    .module('sportModule')
    .controller('SportListController', SportListController);

    SportListController.$inject = ['sportListService', 'establishmentFilteredService'];

    /**
     *
     * @namespace sportListService
     * @desc Controller that manages the list of sports
     * @memberOf Sports
     */
    function SportListController(sportListService, establishmentFilteredService){
        var vm = this;
        /**
         *
         * @type {Sports.SportListController.loadAll}
         */
        vm.loadAll = loadAll;
        /**
         *
         * @type {Sports.SportListController.querySearch}
         */
        vm.querySearch   = querySearch;
        vm.selectedItem  = null;
        vm.searchText    = null;
        /**
         * Array of sports
         * @type {Array}
         */
        vm.sports = [];
        vm.transformChip = transformChip;

        loadAll();

        /**
         * @name loadAll
         * @desc Fetch all the sports and map them into sports array
         * @returns {Array}
         * @memberOf Sports.SportListController
         */
        function loadAll() {
            sportListService.getSports().then(function(data){
                var allSports ="";
                for(var i=0;i<data.count;i++){
                    if(i+1 < data.count)
                        allSports+=data.rows[i].name+", ";
                    else
                        allSports+=data.rows[i].name;
                }
                establishmentFilteredService.setIndexes(data);
                return allSports.split(/, +/g).map( function (sport) {
                    var s= {
                        value: sport.toLowerCase(),
                        display: sport
                    };
                    return vm.sports.push(s);
                });
            });
        }

        /**
         * @name querySearch
         * @param query
         * @returns {String}
         * @memberOf Sports.SportListController
         */
        function querySearch (query) {
            var results = query ? vm.sports.filter( createFilterFor(query) ) : vm.sports ,
                deferred;
            return results;

        }


        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(sport) {
                return (sport.value.indexOf(lowercaseQuery) === 0);
            };
        }

        function transformChip(chip) {
            return { name: chip.display, id: establishmentFilteredService.getIndexOf(chip.display) };
        }

    }
