'use strict';



(function() {
    angular.module('angularjsApp').factory('Interceptor', Interceptor);


    function Interceptor($q) {

        return {
            request: function(config) {
                config.headers['X-TOKEN'] = "jwt-token-mockeado";
                config.mode = 'no-cors';
                return config;
            },
            requestError: function(rejection) {
                // console.log(rejection); // Contains the data about the error on the request.

                // Return the promise rejection.
                return $q.reject(rejection);
            },

            // On response success
            response: function(response) {
                // console.log(response); // Contains the data from the response.

                // Return the response or promise.
                return response || $q.when(response);
            },
            responseError: function(error) {
                if (error.status === 401 || error.status === 403) {
                    //faz alguma coisa.
                }
                return $q.reject(error);
            }
        };

    }
})();