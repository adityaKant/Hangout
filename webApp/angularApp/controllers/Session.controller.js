(function(){
    angular.module('Session.controller',[])
        .controller("SessionController", ctrl);

    function ctrl(api, $currentUser, $mdDialog) {
        var vm = this;
        var currentUser = $currentUser.get();

        vm.signIn = function(){
            var payload = {
                user: vm.formData
            };

            api.Session.save(payload,function (response) {
                $currentUser.setToken(response.accessToken);
                for(var k in response.user) currentUser[k]=response.user[k];
                vm.closeModal();
            },function (errResponse) {

            });
        };

        vm.closeModal = function(){
            $mdDialog.hide();
        };
    }

    ctrl.$inject = [
        'api',
        '$currentUser',
        '$mdDialog'
    ];
})();