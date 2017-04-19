(function() {
    angular.module('SearchBar.controller', [])
        .controller("SearchBarController", searchBarCtrl);

    function searchBarCtrl(api, $venueList, $state, $progressBarFlag) {
        var vm = this;
        var venuesList = $venueList.getVenuesList();
        var progressBar = $progressBarFlag.get();

        vm.getVenues = function(isValid) {
            if(isValid){
                progressBar.flag = true;
                var payload = {
                    keyword : vm.formdata.keyword
                };

                api.Venues.get(payload, function(response) {
                    progressBar.flag = false;
                    venuesList.venues = response.venues;
                    venuesList.keyword = vm.formdata.keyword;
                    $venueList.performAnalytics();
                    // if($state.current.name != 'venues')
                        $state.go('venues',{search: vm.formdata.keyword},{reload: true});
                    },
                    function(errResponse) {

                    });
            }
        }
    }
})();