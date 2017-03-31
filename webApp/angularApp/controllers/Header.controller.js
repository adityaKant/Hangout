(function(){

    var app = angular.module("hangout.headerController",[

    ]);

    app.controller("HeaderController",headerCtrl);

    function headerCtrl($scope, $signInModal){
        var vm = this;
        vm.appName = "Hangout";

        vm.openModal = function(event,modal){
            $signInModal.show(event,modal);
        }
    }

    headerCtrl.$inject = ["$scope", "$signInModal"];
})();