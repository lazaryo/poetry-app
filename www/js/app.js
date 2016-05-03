var poetry_prototype = angular.module('poetry', ['ionic', 'poetry.controllers', 'poetry.services', 'ngCordova', 'firebase']);

poetry_prototype.run(function($ionicPlatform, $cordovaStatusbar) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});

poetry_prototype.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html'
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html'
      }
    }
  })
  
  .state('app.random', {
    url: '/random',
    views: {
      'menuContent': {
        templateUrl: 'templates/random.html'
      }
    }
  })

  .state('app.form', {
      url: '/form',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
  })

  .state('app.mix', {
      url: '/mix',
      views: {
        'menuContent': {
          templateUrl: 'templates/mix.html',
          controller: 'fireCtrl'
        }
      }
  })

  .state('app.single', {
    url: '/form/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
