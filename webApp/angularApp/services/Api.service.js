(function () {
    angular.module('api.service',[
        'ngResource'
    ])
        .factory('api',['$resource',function ($resource) {
            return{
                Me: $resource('/sign-up',{},{}),

                Session: $resource('/sign-in',{},{})
            };
        }])
})();