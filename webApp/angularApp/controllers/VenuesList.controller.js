(function(){

    angular.module("VenuesList.controller",[])
        .controller('VenuesListController', venueListCtrl);

    function venueListCtrl(api, $venueList, $stateParams, $progressBarFlag, $anchorScroll, $location, $constants) {
        var vm = this;
        vm.filter = {};
        vm.filter.categories = [];
        vm.venues = $venueList.getVenuesList();
        vm.searchResultsFor = $stateParams.search;
        var page = 1;
        var per = 10;
        var filtersApplied = false;
        vm.nextPageDisabled = false;
        vm.prevPageDisabled = true;
        var progressBar = $progressBarFlag.get();
        vm.ratingsOptions = $constants.ratings();
        vm.usStates = $constants.stateList();

        var getVenuesList = function(payload){
            progressBar.flag = true;
            api.Venues.get(payload,function (response) {
                $location.hash('venues-list');
                $anchorScroll();
                progressBar.flag = false;
                vm.venues.venues = response.venues;
                if(response.venues.length < per)
                    vm.nextPageDisabled = true;
                else
                    vm.nextPageDisabled = false;
            },function (errResponse) {
            })
        };

        if($stateParams.search.length > 0 && vm.venues.keyword == null){
           getVenuesList({keyword: $stateParams.search});
        }

        vm.getLocation = function(){
            debugger
        };
        
        vm.applyFilter = function () {
            filtersApplied = true;
            var payload = {
                keyword: $stateParams.search,
                filter : vm.filter
            };
            getVenuesList(payload);
        };

        vm.resetFilter = function () {
            if(filtersApplied){
                vm.filter = {};
                getVenuesList({keyword: $stateParams.search});
                filtersApplied = false;
            }
        };

        vm.nextPage = function () {
            vm.prevPageDisabled = false;
            page++;
            var payload = {
                keyword : $stateParams.search,
                page : page,
                per : per
            };
            if(filtersApplied)
                payload.filter = vm.filter;

            getVenuesList(payload);
        };

        vm.prevPage = function () {
            page--;
            if(page == 1)
                vm.prevPageDisabled = true;
            vm.nextPageDisabled = false;
            var payload = {
                keyword : $stateParams.search,
                page : page,
                per : per
            };
            if(filtersApplied)
                payload.filter = vm.filter;

            getVenuesList(payload);
        };
    }
})();