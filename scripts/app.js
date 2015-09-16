(function () {
  'use strict';

  // create the angular app
  angular.module('d3App', [
    'd3App.controllers',
    'd3App.directives'
    ]);

  // setup dependency injection
  angular.module('d3', []);
  angular.module('d3App.controllers', []);
  angular.module('d3App.directives', ['d3']);


}());