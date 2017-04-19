(function() {
    angular.module("Venue.controller", [
        'nvd3',
        'donutChart.service'
    ])
            .controller("VenueController", venueCtrl);

        function venueCtrl(api, $stateParams, $donutChart) {
            var  vm = this;
            var venueId = $stateParams.id;
            var payload = {
                id : venueId
            };
            vm.chartOptions = $donutChart.getOptions();

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
                    vm.chartData = getData(response.rating);
                },
                function (errResponse) {
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