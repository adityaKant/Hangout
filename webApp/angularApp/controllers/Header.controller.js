(function(){

    var app = angular.module("hangout.headerController",[

    ]);

    app.controller("HeaderController",headerCtrl);

    function headerCtrl($state, $signInModal, $currentUser){
        var vm = this;
        vm.appName = "Hangout";
        vm.state  = $state;

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

    headerCtrl.$inject = ["$state", "$signInModal","$currentUser"];
})();