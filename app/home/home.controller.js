/**
 * Home Controller
 * @namespace Home
 */
angular
    .module('homeModule')
    .controller('HomeController', HomeController);

    /**
     * @namespace HomeController
     * @desc Controller that manages the suggestions for locations and search establishments filtered
     * @memberOf Home
     */
    function HomeController(){

        var vm = this;
        /**
         * Array of sugguested cities
         * @type {Array}
         */
        vm.cities = loadAll();
        vm.querySearch   = querySearch;

        /**
         * @name loadAll
         * @desc Suggests locations for the search
         * @returns {Array}
         * @memberOf Home.HomeController
         */
        function loadAll(){

            var cities ='Albacete, Alicante, Almería, Álava, Asturias, Ávila, Badajoz, Baleares, Barcelona, Bizkaia, Burgos,\
             Cáceres, Cádiz, Cantabria, Castellón, Ciudad Real, Córdoba, Coruña A, Cuenca, Guipuzkoa, Girona, Granada,\
             Guadalajara, Huelva, Huesca, Jaén,Las Palmas, La Rioja, León, Lleida, Lugo, Madrid, Málaga, Murcia, Navarra, Ourense,\
             Palencia, Salamanca, Santa Cruz de Tenerife, Segovia, Sevilla, Soria, Tarragona, Teruel, Toledo, Valencia,\
             Valladolid, Zamora, Zaragoza, Ceuta, Melilla';

            return cities.split(/, +/g).map( function (city) {
                return {
                    value: city.toLowerCase(),
                    display: city
                };
            });
        }

        /**
         * @name querySearch
         * @param query
         * @returns {String}
         * @memberOf Home.HomeController
         */
        function querySearch (query) {
            var results = query ? vm.cities.filter( createFilterFor(query) ) : vm.cities ,
                deferred;
            return results;

        }

        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(sport) {
                return (sport.value.indexOf(lowercaseQuery) === 0);
            };
        }

    }


