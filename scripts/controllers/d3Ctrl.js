(function () {
  'use strict';

angular.module('d3App.controllers')
  .controller('d3Ctrl', ['$scope', function($scope) {
    $scope.hashes = { hashName: "MD5" };
    $scope.codeArray = [];
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
    };
    $scope.englishFrequency = {
      'A': .08167,
      'B': .01492,
      'C': .02782,
      'D': .04253,
      'E': .12702,
      'F': .02288,
      'G': .02015,
      'H': .06094,
      'I': .06966,
      'J': .00153,
      'K': .00772,
      'L': .04025,
      'M': .02406,
      'N': .06749,
      'O': .07507,
      'P': .01929,
      'Q': .00095,
      'R': .05987,
      'S': .06327,
      'T': .09056,
      'U': .02758,
      'V': .00978,
      'W': .02360,
      'X': .00150,
      'Y': .01974,
      'Z': .00074
    };

    $scope.createHash = function(message, hashType) {
      if (hashType == "MD5")
        return CryptoJS.MD5(message).toString(CryptoJS.enc.Hex);
      else if (hashType == "SHA-256")
        return CryptoJS.SHA256(message).toString(CryptoJS.enc.Hex);
      else if (hashType == "SHA-3")
        return CryptoJS.SHA3(message).toString(CryptoJS.enc.Hex);
      else
        return "Error";
    };

    $scope.asciiCode = function(text, offset) {
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

  }]);

}());