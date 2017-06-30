'use strict';



angular.module('angularjsApp').service('AboutService', AboutService);

AboutService.$inject = ['$http', '$q', '$rootScope'];

function AboutService($http, $q, $rootScope) {

    var vm = this;

    // var cep = '53130020';

    vm.lista = function() {
        return 'pessoa - serviço';
    };


    vm.cep = function(cep) {
        var defer = $q.defer();

        $http.get('https://viacep.com.br/ws/' + cep + '/json/')
            .then(function success(response) {
                defer.resolve(response.data);
            }), (function error(erro) {
                defer.reject(erro);
            });

        return defer.promise;
    };

}