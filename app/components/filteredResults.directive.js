/**
 * Created by Norman on 31/03/2016.
 */
/**
 * Created by Norman on 26/03/2016.
 */
angular
    .module('homeModule')
    .directive('filteredResults', filteredResults);


function filteredResults() {
    var directive = {
        templateUrl: 'app/home/est-results.html',
        restrict: 'E'
    };
    return directive;
}