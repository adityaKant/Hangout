(function() {
    angular.module("Venue.controller", ['nvd3'])
            .controller("VenueController", venueCtrl);

        function venueCtrl(api, $stateParams) {
            var  vm = this;
            var venueId = $stateParams.id;
            var payload = {
                id : venueId
            }
            api.Venues.get(payload, function(response) {
                vm.venue = response.venue;
                vm.categories = response.category.map(function(a) {return a.CAT_NAME;});;
            },
            function(errResponse) {
            });
            getVenueReviews();

            function getVenueReviews() {
                api.Venues.reviews({id: $stateParams.id}, function (response) {
                    vm.reviews = response.reviews;
                },
                function (errResponse) {
                    debugger;
                })
            }
        }


}) ();