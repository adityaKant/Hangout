(function(){
    var app = angular.module('SignUp.controller',[]);

    app.controller('SignUpController', ctrl);

    function ctrl($scope, $mdDialog, $currentUser) {
        var vm = this;
        var currentUser = $currentUser.get();
        vm.closeModal = function(){
            $mdDialog.hide();
        };

        vm.signUp = function(isValid){
            if(isValid){
                currentUser.name = 'aditya';
                // $currentUser.set(currentUser);
                vm.closeModal();
            }
            else{
                vm.showErrorMessages = true;
            }
        }
    }

    ctrl.$inject = [
        '$scope',
        '$mdDialog',
        '$currentUser'
    ];
})();