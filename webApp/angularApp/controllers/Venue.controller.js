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
                console.log(response);
                vm.venue = response.venue;
            },
            function(errResponse) {

            });


            vm.images = ['1','2','3'];
        }
}) ();