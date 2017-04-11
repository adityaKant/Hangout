(function() {
    angular.module('SearchBar.controller', [])
        .controller("SearchBarController", searchBarCtrl);

    function searchBarCtrl(api, $venueList) {
        var vm = this;
        var venuesList = $venueList.getVenues()
        vm.getVenues = function() {
            var payload = {
                keyword : vm.formdata.keyword
            };

            api.Venues.get(payload, function(response) {
                venuesList.venues = response.venues
            },
            function(errResponse) {

            });
        }
    }
})();