(function () {
    'use strict';

    var app = angular.module('hangout',[
        'hangout.routes',
        'hangout.headerController',
        'ngMaterial',
        'SearchBar.directive',
        'signInModal.service',
        'ngMessages',
        'ngAria',
        'ngStorage',
        'currentUser.service',
        'ngResource',
        'api.service',
        'authInterceptor'
    ]);


    app.config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    }]);

    app.run(function($currentUser, $localStorage){
        if(!$localStorage.user)
            $currentUser.set({});
    })
})();