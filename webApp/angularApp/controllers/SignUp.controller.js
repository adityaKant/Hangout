(function(){
    var app = angular.module('SignUp.controller',[]);

    app.controller('SignUpController', ctrl);

    function ctrl($scope, $mdDialog, $currentUser,api) {
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
                api.Me.save(payLoad,function (response) {
                    for(var k in response.user) currentUser[k]=response.user[k];
                    vm.closeModal();
                },function (errResponse) {
                    debugger;
                });
            }
            else{
                vm.showErrorMessages = true;
            }
        }
    }

    ctrl.$inject = [
        '$scope',
        '$mdDialog',
        '$currentUser',
        'api'
    ];
})();