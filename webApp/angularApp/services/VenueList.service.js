(function() {
    var module = angular.module('VenueList.service',[]);

    module.service ('$venueList', function() {
        var venues = {};
        venues.checkinArr = [];
        venues.reviewsCount = [];

        return {
            getVenuesList : getVenuesList,
            performAnalytics : performAnalytics
        };

        function getVenuesList() {
            return venues;
        }
        
        function performAnalytics() {
            venues.checkinArr.length = 0;

            angular.forEach(venues.venues,function(val,index){
                var temp = {};
                temp.label = val.VENUE_NAME;
                temp.value = val.CHECK_IN_COUNT;
                venues.checkinArr.push(temp);
            });

            venues.reviewsCount.length = 0;

            angular.forEach(venues.venues,function(val,index){
                var temp = {};
                temp.label = val.VENUE_NAME;
                temp.value = val.REVIEW_COUNT;
                venues.reviewsCount.push(temp);
            });
        }
    })

})();
