(function(){
    'use strict';
    angular.module('authInterceptor', ["ngResource", "ngStorage"])
        .factory('authInterceptor', function($localStorage, $currentUser) {
            return {
                request: function(config) {

                    config.headers = config.headers || {};
                    if ($currentUser.getToken()) {
                        config.headers.token = $currentUser.getToken();
                    }
                    return config;
                }
            };
        });

})();
