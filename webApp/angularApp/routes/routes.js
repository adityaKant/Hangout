(function(){
    'use strict';

    angular.module("hangout.routes",[
        'ui.router',
        'VenuesList.controller'
    ])
        .config(['$stateProvider', '$urlRouterProvider','$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider){
            $locationProvider.hashPrefix('');
            $urlRouterProvider.when('', "/");

            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: "angularApp/views/homepage.html"
                })
                .state('venues',{
                    url: '/venues',
                    templateUrl: "angularApp/views/venues-list.html",
                    controller: 'VenuesListController',
                    controllerAs: 'VenuesListCtrl'
                })
                .state('getVenue',{
                    url: '/venues:id',
                    templateUrl: "angularApp/views/venue-details.html",
                    controller: 'VenueController',
                    controllerAs: 'venueCtrl'
                })
        }]);
})();