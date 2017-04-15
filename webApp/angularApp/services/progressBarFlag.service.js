(function(){

    angular.module("progressBarFlag.service",[

    ])
        .factory("$progressBarFlag",function(){
            var flag = {};

            return{
                get: get
            };

            function get(){
                return flag;
            }
        })
})();