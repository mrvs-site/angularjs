'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
    .controller('AboutCtrl', AboutCtrl);

// AboutCtrl.$inject = ['$timeout', 'AboutService', '$scope', '$http'];

function AboutCtrl($timeout, AboutService, $http, $mdToast) {

    var vm = this;

    vm.cep = '';

    function isErro(params) {
        if (params.erro) {
            vm.showSimpleToast();
            vm.logradouro = '';
            vm.bairro = '';
            vm.localidade = '';
            vm.uf = '';
        } else {
            vm.logradouro = params.logradouro;
            vm.bairro = params.bairro;
            vm.localidade = params.localidade;
            vm.uf = params.uf;
        }
    }

    vm.teste = function() {
        AboutService.cep(vm.cep)
            .then(function(params) {
                isErro(params);
            }, function(err) {
                console.log(err);
            });
    }



    vm.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma',
        'Java'
    ];

    vm.botao = function(e) {
        $timeout(function() {
            alert(e);
        }, 1000);
    };


    vm.alerts = [];

    vm.addAlert = function() {
        vm.alerts.push({ type: 'danger', msg: 'CEP não encontrado!' });
    };

    vm.closeAlert = function(index) {
        vm.alerts.splice(index, vm.alerts.length);
    };



    var last = {
        bottom: false,
        top: true,
        left: false,
        right: true
    };

    vm.toastPosition = angular.extend({}, last);

    vm.getToastPosition = function() {
        sanitizePosition();

        return Object.keys(vm.toastPosition)
            .filter(function(pos) { return vm.toastPosition[pos]; })
            .join(' ');
    };

    function sanitizePosition() {
        var current = vm.toastPosition;

        if (current.bottom && last.top) current.top = false;
        if (current.top && last.bottom) current.bottom = false;
        if (current.right && last.left) current.left = false;
        if (current.left && last.right) current.right = false;

        last = angular.extend({}, current);
    }

    vm.showSimpleToast = function() {
        var pinTo = vm.getToastPosition();

        $mdToast.show(
            $mdToast.simple()
            .textContent('CEP não encontrado!')
            .position(pinTo)
            .hideDelay(3000)
        );
    };



}