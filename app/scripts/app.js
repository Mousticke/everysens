'use strict';

/**
 * @ngdoc overview
 * @name everysensApp
 * @description
 * # everysensApp
 *
 * Main module of the application.
 */
angular
  .module('everysensApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'restangular'
  ])
  .config(function ($qProvider, $locationProvider, $routeProvider, RestangularProvider) {
    $locationProvider.hashPrefix('!');
    $qProvider.errorOnUnhandledRejections(false);

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/tasks', {
        templateUrl: 'views/task.html',
        controller: 'TaskCtrl',
        controllerAs: 'task'
      })
      .otherwise({
        redirectTo: '/'
      });
    RestangularProvider.setBaseUrl('https://www.carqueryapi.com');


    // add a response interceptor
    RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
      var extractedData;
      if (operation === "getList") {
        extractedData = data.Models;
      } else {
        extractedData = data;
      }
      return extractedData;
    });
  });



