'use strict';

angular.module('tweetwallApp')
  .controller('MainCtrl', function ($scope, $http, $timeout, $route) {

    var nbTweetsToLoad = 20
    var url = '../twitter-proxy.php?url=' + encodeURIComponent('search/tweets.json?q=USI2013&count=' + nbTweetsToLoad)
    var cssClassArray = [
      '#fcb040',
      '#68c8c6',
      '#72c166',
      '#ef4138',
      '#0088c3'
    ]
    var ngAnimateArray = [
      ['fadeIn', 'fadeOut'],
      ['flipInX', 'flipOutX'],
      ['flipInY', 'flipOutY'],
      ['fadeInUp', 'fadeOutUp'],
      ['fadeInDown', 'fadeOutDown'],
      ['fadeInLeft', 'fadeOutLeft'],
      ['fadeInRight', 'fadeOutRight'],
      ['fadeInUpBig', 'fadeOutUpBig'],
      ['fadeInDownBig', 'fadeOutDownBig'],
      ['fadeInLeftBig', 'fadeOutLeftBig'],
      ['fadeInRightBig', 'fadeOutRightBig'],
      ['bounceIn', 'bounceOut'],
      ['bounceInDown', 'bounceOutDown'],
      ['bounceInUp', 'bounceOutUp'],
      ['bounceInLeft', 'bounceOutLeft'],
      ['bounceInRight', 'bounceOutRight'],
      ['rotateIn', 'rotateOut'],
      ['rotateInDownLeft', 'rotateOutDownLeft'],
      ['rotateInDownRight', 'rotateOutDownRight'],
      ['rotateInUpLeft', 'rotateOutUpLeft'],
      ['rotateInUpRight', 'rotateOutUpRight'],
      ['lightSpeedIn', 'lightSpeedOut'],
      ['rollIn', 'rollOut'],
      ['rollIn', 'hinge']
    ]

    var getNewBackgroundColor = function () {
      var cssClassRandPos = Math.floor(Math.random() * cssClassArray.length)
      var cssClass = cssClassArray[cssClassRandPos]

      return cssClass
    }

    var getNextAnimation = function () {
      var ngAnimateRandPos = Math.floor(Math.random() * ngAnimateArray.length)
      var ngAnimate = ngAnimateArray[ngAnimateRandPos]

      return {show:'animated ' + ngAnimate[0], hide:'animated ' + ngAnimate[1]}
    }

    var fetchTweets = function () {
      $scope.visible = false
      var tweetRandPos = Math.floor(Math.random() * nbTweetsToLoad)

      $http.get(url).then(function (data) {
        var tweet = data.data.statuses[tweetRandPos]

        $scope.tweet = tweet
        $scope.tweetDate = moment($scope.tweetDate).fromNow()
        $scope.newBackgroundColor = getNewBackgroundColor()
        $scope.nextAnimation = getNextAnimation()
        $scope.visible = true
      })
      
      $timeout(fetchTweets, 8000)
    }
    fetchTweets()

  })
