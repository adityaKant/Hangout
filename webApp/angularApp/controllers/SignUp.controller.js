(function(){
    var app = angular.module('SignUp.controller',[]);

    app.controller('SignUpController', ctrl);

    function ctrl($scope, $mdDialog) {
        var vm = this;

        vm.closeModal = function(){
            $mdDialog.hide();
        };
    }

    ctrl.$inject = [
        '$scope',
        '$mdDialog'
    ];
})();