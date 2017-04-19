(function(){
    var app = angular.module('SignUp.controller',[]);

    app.controller('SignUpController', ctrl);

    function ctrl(toastr, $mdDialog, $currentUser,api) {
        var vm = this;
        var currentUser = $currentUser.get();
        vm.closeModal = function(){
            $mdDialog.hide();
        };

        vm.signUp = function(isValid){
            if(isValid){
                var payLoad = {
                    user : vm.formData
                };
                api.SignUp.save(payLoad,function (response) {
                    api.Session.save(payLoad,function(resp){
                        $currentUser.setToken(response.accessToken);
                        for(var k in resp.user) currentUser[k]=resp.user[k];
                        vm.closeModal();
                    },function(errResponse){
                        debugger
                    });
                },function (errResponse) {
                    toastr.error(errResponse.data,'Authentication error');
                });
            }
            else{
                vm.showErrorMessages = true;
            }
        }
    }

    ctrl.$inject = [
        'toastr',
        '$mdDialog',
        '$currentUser',
        'api'
    ];
})();