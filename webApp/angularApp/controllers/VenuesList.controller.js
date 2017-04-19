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
        vm.radiusOptions = $constants.radius();
        var location;
        var venuesCheckins = [];
        var reviewCount = [];

        vm.graphOptions = {
            chart: {
                type: 'multiBarHorizontalChart',
                height: 450,
                x: function(d){return d.label;},
                y: function(d){return d.value;},
                //yErr: function(d){ return [-Math.abs(d.value * Math.random() * 0.3), Math.abs(d.value * Math.random() * 0.3)] },
                showControls: true,
                showValues: true,
                duration: 500,
                xAxis: {
                    showMaxMin: false
                },
                yAxis: {
                    axisLabel: 'Values',
                    tickFormat: function(d){
                        return d3.format(',.0f')(d);
                    }
                }
            }
        };

        var getVenuesList = function(payload){
            progressBar.flag = true;
            api.Venues.get(payload,function (response) {
                $location.hash('venues-list');
                $anchorScroll();
                progressBar.flag = false;
                vm.venues.venues = response.venues;
                venuesCheckins = getVenuesCheckins(response.venues);
                reviewCount = getVenuesReviewCount(response.venues);
                populateGraph();
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
            if(location == null) {
                location = {};
                navigator.geolocation.getCurrentPosition(function(position){
                    location.latitude = position.coords.latitude;
                    location.longitude = position.coords.longitude;
                });
            }
        };
        
        vm.applyFilter = function () {
            filtersApplied = true;
            if(vm.sendLocation){
                vm.filter.latitude = location.latitude;
                vm.filter.longitude = location.longitude;
                vm.filter.radius = vm.selectedRadius;
                if(vm.filter.city)
                    vm.filter.city = null;
                if(vm.filter.state)
                    vm.filter.state = null;
            }
            else{
                vm.filter.latitude = null;
                vm.filter.longitude = null;
            }

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

        function populateGraph() {
            debugger
            vm.graphData = [
                {
                    "key": "Check-ins",
                    "color": "#d62728",
                    "values":   venuesCheckins
                },
                {
                    "key": "Reviews",
                    "color": "#1f77b4",
                    "values": reviewCount
                }
            ];
        }
    }

    function getVenuesCheckins(venuesList){
    debugger
        var checkinArr = [];
        angular.forEach(venuesList,function(val,index){
            var temp = {};
            temp.label = val.VENUE_NAME;
            temp.value = val.CHECK_IN_COUNT;
            checkinArr.push(temp);
        });

        return checkinArr;
    }

    function getVenuesReviewCount(venuesList){
    debugger
            var reviewArr = [];
            angular.forEach(venuesList,function(val,index){
                var temp = {};
                temp.label = val.VENUE_NAME;
                temp.value = val.REVIEW_COUNT;
                reviewArr.push(temp);
            });

            return reviewArr;
        }
})();