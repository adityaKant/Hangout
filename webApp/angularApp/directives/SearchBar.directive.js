(function(){

    var app = angular.module("SearchBar.directive",[

    ]);

    app.directive("searchBar", function(){
        return{
            restrict: 'EA',
            templateUrl: 'angularApp/views/shared/_searchBar.html',
            controller: 'SearchBarController',
            controllerAs: 'SearchBarCtrl'
        };
    })
})();