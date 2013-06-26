'use strict';

angular.module('tweetwallApp')
  .controller('MainCtrl', function ($scope, $http, $timeout, $route) {

    var nbTweetsToLoad = 300
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

    var parseTwitterDate = function (tdate) {
      var system_date = new Date(Date.parse(tdate));
      var user_date = new Date();
      var diff = Math.floor((user_date - system_date) / 1000);

      if (diff <= 1) {return "just now";}
      if (diff < 20) {return diff + " seconds ago";}
      if (diff < 40) {return "half a minute ago";}
      if (diff < 60) {return "less than a minute ago";}
      if (diff <= 90) {return "one minute ago";}
      if (diff <= 3540) {return Math.round(diff / 60) + " minutes ago";}
      if (diff <= 5400) {return "1 hour ago";}
      if (diff <= 86400) {return Math.round(diff / 3600) + " hours ago";}
      if (diff <= 129600) {return "1 day ago";}
      if (diff < 604800) {return Math.round(diff / 86400) + " days ago";}
      if (diff <= 777600) {return "1 week ago";}
      return "on " + system_date;
    }

    var getTweet = function () {
      if (!$scope.tweets) {
        console.log('No tweet to display')
        return null
      }

      var tweetRandPos = Math.floor(Math.random() * $scope.tweets.length)

      $scope.tweet              = $scope.tweets[tweetRandPos]
      $scope.tweetDate          = parseTwitterDate($scope.tweet.created_at)
      $scope.newBackgroundColor = getNewBackgroundColor()
      $scope.nextAnimation      = getNextAnimation()
      $scope.$apply()
    }
    setInterval(getTweet, 5 * 1000)

    var fetchTweets = function (callback) {
      $http.get(url).then(function (data) {
        $scope.tweets = data.data.statuses
        if (callback) {
          callback()
        }
      })
    }
    setInterval(fetchTweets, 1 * 60 * 1000)
    fetchTweets(getTweet)

  })
