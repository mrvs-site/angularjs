'use strict';

/**
 * @ngdoc overview
 * @name angularjsApp
 * @description
 * # angularjsApp
 *
 * Main module of the application.
 */
angular
    .module('angularjsApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngTouch',
        'ui.router',
        'ui.utils.masks',
        'ui.bootstrap',
        'ngMaterial'
    ])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {


        $stateProvider
            .state('home', {
                url: "/",
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .state('about', {
                url: "about",
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl',
                controllerAs: 'about'
            });


        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        // $urlRouterProvider.otherwise("/");

    });