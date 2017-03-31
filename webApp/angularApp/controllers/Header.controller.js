(function(){

    var app = angular.module("hangout.headerController",[

    ]);

    app.controller("HeaderController",headerCtrl);

    function headerCtrl($scope, $signInModal, $currentUser){
        var vm = this;
        vm.appName = "Hangout";

        vm.currentUser = $currentUser.get();

        vm.openModal = function(event,modal){
            $signInModal.show(event,modal);
        }
    }

    headerCtrl.$inject = ["$scope", "$signInModal","$currentUser"];
})();