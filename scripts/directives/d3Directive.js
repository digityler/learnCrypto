(function () {
  'use strict';

  // dynamic d3 bar chart for english letter frequency
  // make more general for other kinds of data

  angular.module('learnCryptoApp.directives')
    .directive('d3BarChart', ['d3', function(d3) {
      function link(scope, element, attr) {
        var data = scope.data;
        var svgWidth = 1100;
        var svgHeight = 550;
        var multiplier = 4000;
        var svg = d3.select(element[0])
                    .append('svg')
                    .attr({width: svgWidth, height: svgHeight});
        var rect = svg.selectAll('rect');
        var rects = rect.data(d3.entries(data));
        rects.enter().append('rect')
                .attr('x', function(d, i) { return i * 42 })
                .attr('y', function(d) { return svgHeight - d.value * multiplier; })
                .attr({ height: svgHeight, width: 40, fill: attr.fill });

        scope.$watch('data', function(data) {
          var rect = svg.selectAll('rect')
          var rects = rect.data(d3.entries(data));
          rects.attr('x', function(d, i) { return i * 42 })
                .attr('y', function(d) { 
                    if ((svgHeight - d.value * multiplier) >= 0)
                      return svgHeight - d.value * multiplier; 
                    else return 0;
                })
                .attr({ height: svgHeight, width: 40 });
                // add character text labels and percentages
                // .text(function(d) { return d.key; });
        }, true);
      }
      return {
        restrict: 'E',
        scope: { data: '=' },
        link: link
      }
    }]);

}());