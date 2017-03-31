(function(){
    angular.module('currentUser.service',[

    ])
        .factory('$currentUser',function (storage) {

            return{
                get: get,
                set: set
            };

            function get() {
                return  storage.user;
            }

            function set(user) {
                storage.user = user;
            }

        })
})();