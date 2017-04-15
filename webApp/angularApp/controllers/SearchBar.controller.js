(function() {
    angular.module('SearchBar.controller', [])
        .controller("SearchBarController", searchBarCtrl);

    function searchBarCtrl(api, $venueList, $state) {
        var vm = this;
        var venuesList = $venueList.getVenuesList();

        vm.getVenues = function(isValid) {
            if(isValid){
                var payload = {
                    keyword : vm.formdata.keyword
                };

                api.Venues.get(payload, function(response) {
                        venuesList.venues = response.venues;
                        if($state.current.name != 'venues')
                            $state.go('venues');
                    },
                    function(errResponse) {

                    });
            }
        }
    }
})();