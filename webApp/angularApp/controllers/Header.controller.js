(function(){

    var app = angular.module("hangout.headerController",[

    ]);

    app.controller("HeaderController",headerCtrl);

    function headerCtrl($state, $signInModal, $currentUser, $progressBarFlag){
        var vm = this;
        vm.appName = "Hangout";
        vm.state  = $state;
        vm.disable = $progressBarFlag.get();
        vm.disable.flag = false;

        vm.currentUser = $currentUser.get();

        vm.openModal = function(event,modal){
            $signInModal.show(event,modal);
        };

        vm.signOut = function(){
            $currentUser.clear();
            $currentUser.set({});
            vm.currentUser = $currentUser.get();
        }
    }

    headerCtrl.$inject = ["$state", "$signInModal","$currentUser", "$progressBarFlag"];
})();