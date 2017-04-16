(function () {
    'use strict';

    var app = angular.module('hangout',[
        'hangout.routes',
        'hangout.headerController',
        'SearchBar.controller',
        'ngMaterial',
        'SearchBar.directive',
        'signInModal.service',
        'ngMessages',
        'ngAria',
        'ngStorage',
        'currentUser.service',
        'ngResource',
        'api.service',
        'VenueList.service',
        'authInterceptor',
        'ngAnimate',
        'toastr',
        'progressBarFlag.service',
        'constants.service'
    ]);


    app.config(['$httpProvider','toastrConfig', function($httpProvider, toastrConfig) {
        $httpProvider.interceptors.push('authInterceptor');

        angular.extend(toastrConfig, {
            maxOpened: 2,
            preventOpenDuplicates: true
        });
    }]);

    app.run(function($currentUser, $localStorage){
        if(!$localStorage.user)
            $currentUser.set({});
    })
})();