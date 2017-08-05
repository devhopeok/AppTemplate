angular.module('starter', ['ionic', 'starter.controllers', 'starter.module', 'starter.settings', 'ionic.cloud'])

.filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
})

.run(function($ionicPlatform, $rootScope, $state, settings, $ionicPush) {
    $ionicPlatform.ready(function() {
        //console.log("appID:" + settings.appID_onesingal + " senderID:" + settings.senderID);
        if (ionic.Platform.device() === 'ios' && window.cordova && window.cordova.plugins.Keyboard) {
            window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            window.cordova.plugins.Keyboard.disableScroll(true);
        }

        if (window.StatusBar) {
            StatusBar.styleDefault();
        }

        console.log("tyep of: " + typeof window.ga);

        if (typeof window.ga !== "undefined") {
            window.ga.startTrackerWithId(settings.tracker_id);
            window.ga.trackView('Home');
        }

        $rootScope.$on('$stateChangeSuccess', function() {
            if (typeof window.ga !== "undefined") {
                if ($state.current.name == "app.quicklinkA") {
                    window.ga.trackView('QUICKLINK A TITLE');
                }
                else if ($state.current.name == "app.quicklinkB") {
                    window.ga.trackView('QUICKLINK B TITLE');
                }
                else if ($state.current.name == "app.quicklinkC") {
                    window.ga.trackView('QUICKLINK C TITLE');
                }
                else {
                    window.ga.trackView($state.current.name);
                }
            }
        });

        $ionicPush.register().then(function(t) {
          return $ionicPush.saveToken(t);
        }).then(function(t) {
          console.log('Token saved:', t.token);
        });

        $rootScope.$on('cloud:push:notification', function(event, data) {
          var msg = data.message;
          alert(msg.title + ': ' + msg.text);
        });
        // // Push Notification
        // var notificationOpenedCallback = function(jsonData) {
        //   console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
        // };
        //
        // // One Signal
        // window.plugins.OneSignal
        //   .startInit(settings.appID_onesingal, settings.senderID)
        //   .handleNotificationOpened(notificationOpenedCallback)
        //   .endInit();
    });
})

.config(function($ionicCloudProvider, IONIC_APP_ID) {
  $ionicCloudProvider.init({

    "core": {
      "app_id": IONIC_APP_ID
    },
    "push": {
      "sender_id": "840347857106",
      "pluginConfig": {
        "ios": {
          "badge": true,
          "sound": true
        },
        "android": {
          "iconColor": "#343434"
        }
      }
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.home', {
        url: '/home',
        views: {
            'menuContent': {
                templateUrl: 'templates/home.html'
            }
        }
    })

    .state('app.quicklinkA', {
        url: '/quicklinkA',
        views: {
            'menuContent': {
                templateUrl: 'templates/quicklinkA.html'
            }
        }
    })

    .state('app.members', {
        url: '/members',
        views: {
            'menuContent': {
                templateUrl: 'templates/members.html'
            }
        }

    })

    .state('app.quicklinkB', {
        url: '/quicklinkB',
        views: {
            'menuContent': {
                templateUrl: 'templates/quicklinkB.html'
            }
        }
    })

    .state('app.quicklinkC', {
        url: '/quicklinkC',
        views: {
            'menuContent': {
                templateUrl: 'templates/quicklinkC.html'
            }
        }
    })

    .state('app.hotdeals', {
        url: '/hotdeals',
        views: {
            'menuContent': {
                templateUrl: 'templates/hotdeals.html'
            }
        }
    })

    .state('app.jobs', {
        url: '/jobs',
        views: {
            'menuContent': {
                templateUrl: 'templates/jobs.html'
            }
        }
    })

    .state('app.search', {
        url: '/search',
        views: {
            'menuContent': {
                templateUrl: 'templates/search.html'
            }
        }
    })

    .state('app.news', {
        url: '/news',
        views: {
            'menuContent': {
                templateUrl: 'templates/news.html'
            }
        }
    })

    .state('app.events', {
        url: '/events',
        views: {
            'menuContent': {
                templateUrl: 'templates/events.html'
            }
        }
    })

    .state('app.about', {
        url: '/about',
        views: {
            'menuContent': {
                templateUrl: 'templates/about.html'
            }
        }
    });

    $urlRouterProvider.otherwise('/app/home');
});
