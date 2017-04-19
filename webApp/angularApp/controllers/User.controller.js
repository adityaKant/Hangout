(function() {
    angular.module("User.controller",[])
                .controller("UserController", userCtrl);

    function userCtrl(api) {
        var vm = this;
        api.Me.get  ({},function (response) {
            vm.user = response
//            console.log(response)

        },function (errResponse) {

        })

        api.Me.myReviews({}, function(reviews) {
            var response = [];
            response = reviews
            debugger
            vm.myReviews = response[0]
//            console.log(myReviews)
        },function(errResponse1) {

        })
    }
})();