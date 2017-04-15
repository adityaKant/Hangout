(function() {
    angular.module('SearchBar.controller', [])
        .controller("SearchBarController", searchBarCtrl);

    function searchBarCtrl(api, $venueList, $state) {
        var vm = this;
        var venuesList = $venueList.getVenuesList();

        vm.getVenues = function(isValid) {
            navigator.geolocation.getCurrentPosition(function(position){
                debugger
            });
            if(isValid){
                var payload = {
                    keyword : vm.formdata.keyword
                };

                api.Venues.get(payload, function(response) {
                        venuesList.venues = response.venues;
                        venuesList.keyword = vm.formdata.keyword;
                        // if($state.current.name != 'venues')
                            $state.go('venues',{search: vm.formdata.keyword},{reload: true});
                    },
                    function(errResponse) {

                    });
            }
        }
    }
})();