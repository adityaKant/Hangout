(function() {
    angular.module("Venue.controller", [
        'nvd3',
        'donutChart.service'
    ])
            .controller("VenueController", venueCtrl);

        function venueCtrl(api, $stateParams, $donutChart, $currentUser) {
            var  vm = this;
            var venueId = $stateParams.id;
            var payload = {
                id : venueId
            };
            vm.currentUser = $currentUser.get();
            vm.chartOptions = $donutChart.getOptions();

            api.Venues.get(payload, function(response) {
                vm.venue = response.venue;
                vm.categories = response.category.map(function(a) {return a.CAT_NAME;});
                vm.suggestedVenues = response.suggestedVenues;
            },
            function(errResponse) {
            });

            getVenueReviews();

            function getVenueReviews() {
                api.Venues.reviews({id: $stateParams.id}, function (response) {
                    vm.reviews = response.reviews;
                    vm.chartData = getData(response.rating);
                },
                function (errResponse) {
                })
            }

            vm.checkIfLikedAlready = function () {
                if(!vm.currentUser.FNAME)
                    return false;
                if(vm.currentUser.likedPlaces.filter(function(venue){
                    return venue.VENUE_ID == $stateParams.id
                }).length != 0)
                    return false;
                return true;
            }

            vm.addToFav = function (){
                api.Venues.like({id: $stateParams.id},function (response) {
                    vm.liked = true;
                    vm.currentUser.likedPlaces.push(
                        {
                            VENUE_ID : $stateParams.id
                        });
                }, function (errResponse) {

                })
            }
        }
        function getData(ratings) {
            var dataArray = [];

            angular.forEach(ratings,function(val,index){
                var temp = {};
                temp.key = val.REVIEW_TYPE;
                temp.y = val.COUNT

                dataArray.push(temp);
            });

            return dataArray;
        }


}) ();