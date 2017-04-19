(function() {
    angular.module("User.controller",[])
                .controller("UserController", userCtrl);

    function userCtrl(api) {
        var vm = this;
        api.Me.get  ({},function (response) {
            vm.user = response

        },function (errResponse) {

        })
    }
})();