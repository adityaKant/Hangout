(function(){

    var app = angular.module("hangout.headerController",[

    ]);

    app.controller("HeaderController",headerCtrl);

    function headerCtrl($scope){
        var vm = this;
        vm.appName = "Hangout";
    }

    headerCtrl.$inject = ["$scope"];
})();