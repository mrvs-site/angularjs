'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the angularjsApp
 */



angular.module('angularjsApp').controller('LoginCtrl', LoginCtrl);


function LoginCtrl($location, ServiceMain, $translate, $translatePartialLoader, $timeout) {

    var vm = this;

    $translatePartialLoader.addPart('login');
    $translate.refresh();

    initController();

    function initController() {
        //Aqui iremos resetar o status do login:
        ServiceMain.Logout();
    }

    vm.login = function() {

        $timeout(
            function() {
                vm.loading = false;
            }, 3000
        );

        ServiceMain.Login(vm.username, vm.password, function(result) {
            if (result === true) {
                vm.error = false;
                $location.path('/');
            } else {
                vm.error = true;
                vm.loading = true;
            }
        });
    };

    vm.teste = function(idioma) {
        $translate.use(idioma);
    };


}