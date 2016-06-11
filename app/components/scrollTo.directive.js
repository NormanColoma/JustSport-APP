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
            var title = $('.update-t');
            element.on('click', function(){
                if(attrs.id == "scrollResults"){
                    $('body').animate({scrollTop: results.offset().top}, "slow");
                }else if(attrs.id == "update-estab" || attrs.id === "addEst" || attrs.id === "listEst" || attrs.id === "addCourse" || attrs.id === "listCourses"){
                    $('body').animate({scrollTop: $('body').offset().top}, "slow");
                }
                else{
                    $('body').animate({scrollTop: scroll.offset().top}, "slow");
                }
            });
        }
    }