(function() {
    var module = angular.module('VenueList.service',[]);

    module.service ('$venueList', function() {
        return {
            getVenues : getVenues,
            venues : {}
        }

        function getVenues() {
            return this.venues;
        }
    })

})();
