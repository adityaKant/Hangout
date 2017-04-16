(function() {
    angular.module("Venue.controller", [])
            .controller("VenueController", venueCtrl);

        function venueCtrl(api, $stateParams) {
            var venueId = $stateParams.id;
            var payload = {
                id : venueId
            }
            api.Venues.get(payload, function(response) {
                console.log(response);
                debugger;
            },
            function(errResponse) {

            });
        }
}) ();