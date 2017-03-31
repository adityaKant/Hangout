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
        'angularLocalStorage',
        'currentUser.service'
    ]);

    app.run(function($currentUser){
        $currentUser.set({});
    })
})();