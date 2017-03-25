(function(){
    'use strict';

    angular.module("hangout.routes",[
        'ui.router'
    ])
        .config(['$stateProvider', '$urlRouterProvider','$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider){
            $locationProvider.hashPrefix('');
            $urlRouterProvider.when('', "/");

            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: "angularApp/views/homepage.html"
                })
        }]);
})();