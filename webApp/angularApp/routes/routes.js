(function(){
    'use strict';

    angular.module("hangout.routes",[
        'ui.router',
        'VenuesList.controller',
        'Venue.controller',
        'User.controller'
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
                    url: '/venues?search',
                    templateUrl: "angularApp/views/venues-list.html",
                    controller: 'VenuesListController',
                    controllerAs: 'VenuesListCtrl',
                    params: {
                        search: ''
                    }
                })
                .state('getVenue',{
                    url: '/venues/:id',
                    templateUrl: "angularApp/views/venue-details.html",
                    controller: 'VenueController',
                    controllerAs: 'venueCtrl'
                })
                 .state('userProfile',{
                    url: '/myprofile',
                    templateUrl: "angularApp/views/userProfile.html",
                    controller: 'UserController',
                    controllerAs: 'userCtrl'
                })
        }]);
})();