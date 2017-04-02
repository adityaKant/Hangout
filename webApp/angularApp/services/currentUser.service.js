(function(){
    angular.module('currentUser.service',[

    ])
        .factory('$currentUser',function ($localStorage) {

            return{
                get: get,
                set: set,
                clear: clear,
                setToken: setToken,
                getToken: getToken
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

            function setToken(token){
                $localStorage.token = token;
            }

            function getToken(){
                return $localStorage.token;
            }
        })
})();