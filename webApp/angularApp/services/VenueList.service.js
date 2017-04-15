(function() {
    var module = angular.module('VenueList.service',[]);

    module.service ('$venueList', function() {
        var venues = {};
        return {
            getVenuesList : getVenuesList
        }

        function getVenuesList() {
            return venues;
        }
    })

})();
