(function(){

    angular.module("donutChart.service",[

    ])

        .factory("$donutChart", function () {
            return{
                getOptions: getOptions
            };

            function getOptions(){
                return {
                    chart: {
                        type: 'pieChart',
                        height: 300,
                        donut: true,
                        x: function(d){return d.key;},
                        y: function(d){return d.y;},
                        showLabels: true,

                        pie: {
                            startAngle: function(d) { return d.startAngle/2 -Math.PI/2 },
                            endAngle: function(d) { return d.endAngle/2 -Math.PI/2 }
                        },
                        duration: 500,
                        legend: {
                            margin: {
                                top: 5,
                                right: 140,
                                bottom: 5,
                                left: 0
                            }
                        }
                    },
                    title: {
                        enable: true,
                        text: "Rating Statistics",
                        className: "h3"
                    }
                };
            }
        })

})()