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
        'ngMessages',
        'ui.router',
        'ui.utils.masks',
        'ui.bootstrap',
        'ngMaterial',
        'ui.grid',
        'ui.grid.selection',
        'ui.grid.grouping',
        'ngStorage',
        'ngMockE2E',
        'pascalprecht.translate'

    ])
    .config(function($qProvider, $stateProvider, $urlRouterProvider, $locationProvider, $translateProvider, $translatePartialLoaderProvider, $httpProvider) {

        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        // Dicionário em arquivo
        // $translatePartialLoaderProvider.addPart('home');
        $translateProvider.useSanitizeValueStrategy('escape');
        $translateProvider.preferredLanguage('br');
        $translateProvider.fallbackLanguage('br');

        // $translateProvider.addInterpolation('$translateMessageFormatInterpolation');

        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: '/i18n/{part}/{lang}.json'
        });

        // $translateProvider.useLoader('/app/home/i18n/br.json');

        //  urlTemplate: '/app/{part}/i18n/{lang}.json'


        // Dicionário Local
        // $translateProvider.translations('us', {
        //     PORTUGUESE: 'Portuguese',
        //     ENGLISH: 'English',
        //     USER: 'User',
        //     PASSWORD: 'Password',
        //     LOGIN: 'Login',
        //     LANGUAGE: 'Language',
        //     HOME: 'Home',
        //     ABOUT: 'About',
        //     CONTACT: 'Contact',
        //     FIELD_REQUIRED: 'Field is required',
        //     ERRO_LOGIN: 'User and password are incorrect!',
        //     LIST: 'List',
        //     NAME: 'Name',
        //     AGE: 'Age'
        // });

        // $translateProvider.translations('br', {
        //     PORTUGUESE: 'Português',
        //     ENGLISH: 'Inglês',
        //     USER: 'Usuário',
        //     PASSWORD: 'Senha',
        //     LOGIN: 'Entrar',
        //     LANGUAGE: 'Idioma',
        //     HOME: 'Início',
        //     ABOUT: 'Sobre',
        //     CONTACT: 'Contato',
        //     FIELD_REQUIRED: 'Campo obrigatório',
        //     ERRO_LOGIN: 'Usuário e senha estão incorretos!',
        //     LIST: 'Lista',
        //     NAME: 'Nome',
        //     AGE: 'Idade'
        // });


        //Usar linguagem do browser
        // $translateProvider.determinePreferredLanguage();


        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'lg'
            })
            .state('home', {
                url: '/',
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main',
                data: {
                    authorization: true,
                    redirectTo: 'login'
                }
            })
            .state('about', {
                url: '/about',
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl',
                controllerAs: 'about',
                data: {
                    authorization: false,
                    redirectTo: 'login'
                }
            })
            .state('contact', {
                url: '/contact',
                templateUrl: 'views/contact.html',
                controller: 'ContactCtrl',
                controllerAs: 'contact',
                data: {
                    authorization: false,
                    redirectTo: 'login'
                }
            })
            .state('404', {
                url: '/404',
                templateUrl: 'views/404.html',
            });



        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $qProvider.errorOnUnhandledRejections(false);

        // $stateProvider
        //     .state('404', {
        //         url: '404',
        //         templateUrl: 'views/404.html',
        //     });

        $urlRouterProvider.otherwise('login');

    }).run(function($rootScope, $location, $localStorage, $state, $translate) {

        $location.path('login');

        // $rootScope.$on('$translatePartialLoaderStructureChanged', function() {
        //     $translate.refresh();
        // });

        // if ($localStorage.currentUser) {
        //     $http.defaults.headers.common.Authorization = 'Coders ' + $localStorage.currentUser.token;
        // }

        $rootScope.$on('$locationChangeStart', function(event, next, current) {
            var paginasPublicas = ['login'];
            var paginaRestrita = paginasPublicas.indexOf($location.path()) === -1;

            if (paginaRestrita && !$localStorage.currentUser) {
                $location.path('login');
                $state.go('login');
            }
        });


        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {

            var app = toState.name.indexOf('.');
            if (app !== -1) {

                var part = toState.name.slice(app + 1, toState.length);
                $translatePartialLoader.addPart(part);

                var from = fromState.name.indexOf('.');
                if (from !== -1) {

                    var old_part = toState.name.slice(app + 1, toState.length);
                    $translatePartialLoader.deletePart(old_part, true);
                }
            }

        });

        $rootScope.$on('$translatePartialLoaderStructureChanged', function() {
            $translate.refresh();
        });

        // $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        //     if (toState.authenticate && !$localStorage.currentUser) {
        //         // User isn’t authenticated
        //         $state.go('login');
        //         $state.transitionTo('login');
        //         event.preventDefault();
        //     }
        // });

    });