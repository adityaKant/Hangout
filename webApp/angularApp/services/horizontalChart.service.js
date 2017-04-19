(function(){
    angular.module("horizontalChart.service",[

    ])
        .factory("$horizontalChart",function(){
            return {
                getOptions : getOptions,
                getData : getData
            };

            function getOptions(){
                return {
                    chart: {
                        type: 'multiBarHorizontalChart',
                        height: 300,
                        margin : {
                            left: 120
                        },
                        x: function(d){return d.label;},
                        y: function(d){return d.value;},
                        showControls: true,
                        showValues: true,
                        stacked: true,
                        duration: 500,
                        xAxis: {
                            showMaxMin: false
                        },
                        yAxis: {
                            axisLabel: 'Values',
                            tickFormat: function(d){
                                return d3.format(',.0f')(d);
                            }
                        }
                    }
                };
            }

            function getData(data1,data2){
                return [
                    {
                        key: "Check-ins",
                        color: "#5cb85c",
                        values: data1
                    },
                    {
                        key: "Reviews",
                        color: "#d62728",
                        values: data2
                    }
                ];
            }
        })
})();