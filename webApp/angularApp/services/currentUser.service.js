(function(){
    angular.module('currentUser.service',[

    ])
        .factory('$currentUser',function ($localStorage) {

            return{
                get: get,
                set: set,
                clear: clear
            };

            function get() {
                return  $localStorage.user;
            }

            function set(user) {
                $localStorage.user = user;
            }

            function clear(){
                $localStorage.$reset();
            }
        })
})();