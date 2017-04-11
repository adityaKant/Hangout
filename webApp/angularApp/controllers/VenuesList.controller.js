(function(){

    angular.module("VenuesList.controller",[])
        .controller('VenuesListController', venueListCtrl);

    function venueListCtrl(api, $venueList) {
        var vm = this;
        vm.venues = $venueList.getVenuesList();
        console.log(vm.venues);
    }
})();