(function(){
    'use strict';

    angular.module("hangout.routes",[
        'ui.router'
    ])
        .config(['$stateProvider', '$urlRouterProvider','$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider){
            $locationProvider.hashPrefix('');
            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('home', {
                    url: '/',
                    template: '<h1>SET UP DONE</h1>'
                })
        }]);
})();