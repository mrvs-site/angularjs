'use strict';



angular.module('angularjsApp').run(BackEndMock);


function BackEndMock($httpBackend) {

    var testUsuario = {
        username: 'teste',
        password: 'teste',
        nome: 'Teste',
        sobrenome: 'Usuario'
    };

    //Aqui estamos criando uma api (end point) de autenticação falsa:
    $httpBackend.whenPOST('/api/authenticate').respond(function(method, url, data) {

        //Irá pegar os parâmetros inseridos e enviar logo em seguida via post
        var params = angular.fromJson(data);

        // Aqui irá verificar se as credenciais do usuário estão corretas e retornará um jwt token falso se os dados forem válidos:
        if (params.username === testUsuario.username && params.password === testUsuario.password) {
            return [200, {
                token: 'jwt-token-mockeado'
            }, {}];
        } else {
            return [200, {}, {}];
        }
    });

    $httpBackend.whenGET(/.*/).passThrough();
    // $httpBackend.whenGET(/^\w+.*/).passThrough();
    // $httpBackend.whenGET( /*://*/ ).passThrough();


}