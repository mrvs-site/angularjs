'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.factory:ServiceMain
 * @description
 * # ServiceMain
 * Factory of the angularjsApp
 */


angular.module('angularjsApp').factory('ServiceMain', ServiceMain);

function ServiceMain($http, $location, $localStorage) {

    var service = {};

    service.Login = Login;
    service.Logout = Logout;

    function Login(username, password, callback) {
        $http.post('/api/authenticate', {
                username: username,
                password: password
            })
            .then(function(response) {
                //Caso o login efetuado pelo usuário seja satisfatório então enviará um token via response:
                if (response.data.token) {
                    //Armazenará localmente o usuário e o token para que mantenha o usuário logado em caso de dar um refresh nas páginas:
                    $localStorage.currentUser = {
                        username: username,
                        token: response.data.token
                    };

                    //Aqui estamos adicionando um token jwt no header de todos os requests das solicitações feitas via $http
                    $http.defaults.headers.common.Authorization = 'Coders ' + response.data.token;

                    //Aqui iremos executar um callback como true para indicar que o login foi bem sucedido:
                    callback(true);
                } else {
                    //e callback como false para indicar que o login não foi bem sucedido:
                    callback(false);
                }
            });
    }

    function Logout() {
        //Aqui estaremos removendo todos os usuários guardados via localStorage e limparemos auth header do http:
        delete $localStorage.currentUser;
        $http.defaults.headers.common.Authorization = '';
    }

    return service;

}