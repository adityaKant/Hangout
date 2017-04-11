(function(){

    angular.module("RatingsFilter.controller",['ngMaterial'])
        .controller('RatingsFilterController', ratingsCtrl);

    function ratingsCtrl() {
        var vm = this;
        vm.ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        vm.selectedRating = 1;
        console.log(vm.selectedRating);
    }
})();