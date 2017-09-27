'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp').controller('MainCtrl', MainCtrl);


function MainCtrl($location, $translate, $translatePartialLoader) {

    var vm = this;

    $translatePartialLoader.addPart('login');
    $translate.refresh();

    vm.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
    ];



}