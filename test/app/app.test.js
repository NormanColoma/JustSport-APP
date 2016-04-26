/**
 * Created by Norman on 06/04/2016.
 */
/**
 * Created by Norman on 12/03/2016.
 */
(function(){
    'use strict';

    angular
        .module('justSportTest',['justSport', 'ngMockE2E'])
        .run(testApp);

    testApp.$inject = ['$httpBackend'];

    function testApp($httpBackend){
        var local_api = "https://localhost:3000/api";



        $httpBackend.whenGET('./public/images/icons/account.svg').passThrough();
        $httpBackend.whenGET('public/images/icons/ic_expand_more_black_36px.svg').passThrough();
        $httpBackend.whenGET('public/images/icons/date.svg').passThrough();
        $httpBackend.whenGET('public/images/icons/info.svg').passThrough();
        $httpBackend.whenGET('public/images/icons/ic_close.svg').passThrough();

    }

})();