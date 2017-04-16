(function () {

    angular.module('constants.service',[

    ])
        .factory('$constants',function(){
            var ratings = [
                {option: '>=1', value : 1},
                {option: '>=2', value : 2},
                {option: '>=3', value : 3},
                {option: '>=4', value : 4},
                {option: '>=5', value : 5},
                {option: '>=6', value : 6},
                {option: '>=7', value : 7},
                {option: '>=8', value : 8},
                {option: '>=9', value : 9},
                {option: '10', value : 10}
            ];
            var stateList = ["AK","AL","AR","AZ","CA","CO","CT","DC","DE","FL","GA","GU","HI",
                "IA","ID", "IL","IN","KS","KY","LA","MA","MD","ME","MH","MI","MN","MO","MS","MT",
                "NC","ND","NE","NH","NJ","NM","NV","NY", "OH","OK","OR","PA","PR","PW","RI","SC",
                "SD","TN","TX","UT","VA","VI","VT","WA","WI","WV","WY"];
            var radius = [
                {option: 'less than 10 Miles', value: 10},
                {option: 'less than 20 Miles', value: 20},
                {option: 'less than 30 Miles', value: 30},
                {option: 'less than 40 Miles', value: 40},
            ];
            return{
                ratings: function(){return ratings;},
                stateList: function () {return stateList;},
                radius: function () {return radius;}
            };
        })
})();