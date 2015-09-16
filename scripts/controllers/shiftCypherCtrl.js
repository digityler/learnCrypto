(function () {
  'use strict';

angular.module('d3App.controllers')
  .controller('shiftCypherCtrl', ['$scope', function($scope, $http, dataUrl) {
    $scope.codeArray = [];

    $scope.asciiCode = function(text, offset) {
      if (text == undefined) return;
      $scope.codeArray = [];
      for (var i = 0; i < text.length; i++) {
        var textUpper = text.toUpperCase();
        if (textUpper.charCodeAt(i) >= 65 && textUpper.charCodeAt(i) <= 90) {
          var asciiOffset = (parseInt(textUpper.charCodeAt(i)) + parseInt(offset) + 13) % 26;
          var codeStr = String.fromCharCode(asciiOffset + 65);
          $scope.codeArray.push(codeStr);
        } else {
          $scope.codeArray.push(String.fromCharCode(32));
        }
      }
      return $scope.codeArray;
    }

    $scope.charFrequency = function(str) {
      if (str == undefined) return;
      var charCount = $scope.charFreq;
      for (var i = 65; i < 91; i++)
        charCount[String.fromCharCode(i)] = 0;
      for (var i = 0; i < str.length; i++) {
        if (str[i] in charCount)
          charCount[str[i]] += 1;
      }
      var charFreq = {};
      for (var letter in charCount) 
        charFreq[letter] = (charCount[letter] / str.length);
      $scope.charFreq = charFreq;
    }

    $scope.charFreq = {
      'A': 0,
      'B': 0,
      'C': 0,
      'D': 0,
      'E': 0,
      'F': 0,
      'G': 0,
      'H': 0,
      'I': 0,
      'J': 0,
      'K': 0,
      'L': 0,
      'M': 0,
      'N': 0,
      'O': 0,
      'P': 0,
      'Q': 0,
      'R': 0,
      'S': 0,
      'T': 0,
      'U': 0,
      'V': 0,
      'W': 0,
      'X': 0,
      'Y': 0,
      'Z': 0
    }
    $scope.englishFreq = {
      'A': 0.08167,
      'B': 0.01492,
      'C': 0.02782,
      'D': 0.04253,
      'E': 0.12702,
      'F': 0.02288,
      'G': 0.02015,
      'H': 0.06094,
      'I': 0.06966,
      'J': 0.00153,
      'K': 0.00772,
      'L': 0.04025,
      'M': 0.02406,
      'N': 0.06749,
      'O': 0.07507,
      'P': 0.01929,
      'Q': 0.00095,
      'R': 0.05987,
      'S': 0.06327,
      'T': 0.09056,
      'U': 0.02758,
      'V': 0.00978,
      'W': 0.02360,
      'X': 0.00150,
      'Y': 0.01974,
      'Z': 0.00074
    }
  }]);

}());