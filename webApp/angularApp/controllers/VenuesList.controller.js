(function(){

    angular.module("VenuesList.controller",[])
        .controller('VenuesListController', venueListCtrl);

    function venueListCtrl(api, $venueList, $stateParams) {
        var vm = this;
        vm.filter = {};
        vm.filter.categories = [];
        vm.venues = $venueList.getVenuesList();
        vm.searchResultsFor = $stateParams.search;

        if($stateParams.search.length > 0 && vm.venues.keyword == null){
            api.Venues.get({keyword: $stateParams.search},function (response) {
                vm.venues.venues = response.venues;
                // vm.venues.keyword = $stateParams.search;
            },function (errResponse) {
            })
        }
        console.log(vm.venues);
    }
})();