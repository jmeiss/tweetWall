'use strict';

angular.module('tweetwallApp')
  .controller('MainCtrl', function ($scope, $http, $timeout, $route) {

    var nbTweetsToLoad = 50
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

    var getTweet = function () {
      var tweetRandPos = Math.floor(Math.random() * nbTweetsToLoad)

      $scope.tweet = $scope.tweets[tweetRandPos]
      $scope.tweetDate = moment($scope.tweetDate).fromNow()
      $scope.newBackgroundColor = getNewBackgroundColor()
      $scope.nextAnimation = getNextAnimation()
      
      $timeout(getTweet, 5000)
    }

    var fetchTweets = function () {
      $http.get(url).then(function (data) {
        $scope.tweets = data.data.statuses
        getTweet()
      })

      $timeout(fetchTweets, 10 * 60 * 1000)
    }
    fetchTweets()

  })
