(function () {
    angular.module('api.service',[
        'ngResource'
    ])
        .factory('api',['$resource',function ($resource) {
            return{
                SignUp: $resource('/sign-up',{},{}),

                Session: $resource('/sign-in',{},{}),

                Venues: $resource('/venues/:id', {id: '@id'}, {}),

                Me: $resource('/me',{},{})

            };
        }])
})();