/**
 * Created by Norman on 26/03/2016.
 */
angular
    .module('homeModule')
    .directive('scrollTo', scrollTo);


    function scrollTo() {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            var scroll = $('#scroll');
            var results = $('#results');
            element.on('click', function(){
                if(attrs.id == "scrollResults"){
                    $('body').animate({scrollTop: results.offset().top}, "slow");
                }else{
                    $('body').animate({scrollTop: scroll.offset().top}, "slow");
                }
            });
        }
    }