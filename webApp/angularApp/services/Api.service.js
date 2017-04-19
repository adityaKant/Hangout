(function () {
    angular.module('api.service',[
        'ngResource'
    ])
        .factory('api',['$resource',function ($resource) {
            return{
                SignUp: $resource('/sign-up',{},{}),

                Session: $resource('/sign-in',{},{}),

                Venues: $resource('/venues/:id', {id: '@id'}, {
                    reviews: {
                        method: 'GET',
                        url: '/venues/:id/review'
                    }
                }),

                Me: $resource('/me',{},{})

            };
        }])
})();