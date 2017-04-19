(function(){
    angular.module('Session.controller',[])
        .controller("SessionController", ctrl);

    function ctrl(api, $currentUser, $mdDialog, toastr) {
        var vm = this;
        var currentUser = $currentUser.get();

        vm.signIn = function(){
            var payload = {
                user: vm.formData
            };

            api.Session.save(payload,function (response) {
                $currentUser.setToken(response.accessToken);
                for(var k in response.user) currentUser[k]=response.user[k];
                api.Me.get({},function (response){
                    currentUser.likedPlaces = response.likes;
                },function (errResponse){
                });
                vm.closeModal();
            },function (errResponse) {
                toastr.error(errResponse.data,'Authentication error');
            });
        };

        vm.closeModal = function(){
            $mdDialog.hide();
        };
    }

    ctrl.$inject = [
        'api',
        '$currentUser',
        '$mdDialog',
        'toastr'
    ];
})();