/**
 * Created by Norman on 12/03/2016.
 */
(function(){
    'use strict';

    angular
        .module('justSport',['ngMaterial', 'ngMessages', 'homeModule','sportModule', 'loginModule', 'registerModule', 'establishmentModule',
        'userAccountModule', 'backOfficeModule'])
        .config(['$mdThemingProvider', function($mdThemingProvider) {
            var customPrimary = {
                '50': '#65acf3',
                '100': '#4d9ff1',
                '200': '#3692ef',
                '300': '#1e85ed',
                '400': '#1279e0',
                '500': '#106CC8',
                '600': '#0e5fb0',
                '700': '#0c5299',
                '800': '#0a4681',
                '900': '#08396a',
                'A100': '#7cb8f5',
                'A200': '#94c5f6',
                'A400': '#acd2f8',
                'A700': '#072c52',
                'contrastDefaultColor': 'light'
            };
            $mdThemingProvider
                .definePalette('customPrimary',
                    customPrimary);
            $mdThemingProvider.theme('default')
                .primaryPalette('customPrimary');
        }]);
})();
