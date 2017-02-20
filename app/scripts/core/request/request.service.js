/**
 * @namespace app.core
 * @description Serviço com métodos HTTP para requisições http / json
 */
(function () {
    'use strict';

    angular
        .module('app.request')
        .service('requestJsonService', requestJsonService);


    requestJsonService.$inject = ['$http', '$uibModal', '$translate'];


    /** @ngInject */
    function requestJsonService($http, $uibModal, $translate) {

        return {
            get: get,
            post: post,
            postUntreated: postUntreated,
            put: put,
            putUntreated: putUntreated,
            delete: del,
        };


        /**
         * Executa request tipo GET
         * @param url
         * @param method
         * @param parameters
         * @param headers
         * @param callback
         * @return {TransactionModel}
         */
        function get(url, method, parameters, headers, callback) {
            $http({
                method: "GET",
                url: url + "/" + method + convertParameters(parameters),
                responseType: "json",
                headers: convertHeaders(headers)
            }).then(function successCallback(response) {
                callback(response.data);
            }, function errorCallback(response) {
                modal(response, $uibModal, $translate)
            });
        }

        /**
         * Executa request tipo POST
         * @param url
         * @param method
         * @param data
         * @param headers
         * @param callback
         * @return {TransactionModel}
         */
        function post(url, method, data, headers, callback) {
            $http({
                method: "POST",
                url: url + "/" + method,
                data: JSON.stringify(data),
                responseType: "json",
                headers: convertHeaders(headers)
            }).then(function successCallback(response) {
                callback(response.data);
            }, function errorCallback(response) {
                modal(response, $uibModal, $translate)
            });
        }

        /**
         * Executa request tipo POST sem tratamento do retorno
         * @param url
         * @param method
         * @param data
         * @param headers
         * @param callback
         * @return {TransactionModel}
         */
        function postUntreated(url, method, data, headers, callback) {
            $http({
                method: "POST",
                url: url + "/" + method,
                data: JSON.stringify(data),
                responseType: "json",
                headers: convertHeaders(headers)
            }).then(function successCallback(response) {
                callback(response);
            }, function errorCallback(response) {
                callback(response);
            });
        }

        /**
         * Executa request tipo PUT
         * @param url
         * @param method
         * @param data
         * @param headers
         * @param callback
         * @return {TransactionModel}
         */
        function put(url, method, data, headers, callback) {
            $http({
                method: "PUT",
                url: url + "/" + method,
                data: JSON.stringify(data),
                responseType: "json",
                headers: convertHeaders(headers)
            }).then(function successCallback(response) {
                callback(response.data);
            }, function errorCallback(response) {
                modal(response, $uibModal, $translate)
            });
        }


        /**
         * Executa request tipo POST sem tratamento do retorno
         * @param url
         * @param method
         * @param data
         * @param headers
         * @param callback
         * @return {TransactionModel}
         */
        function putUntreated(url, method, data, headers, callback) {
            $http({
                method: "PUT",
                url: url + "/" + method,
                data: JSON.stringify(data),
                responseType: "json",
                headers: convertHeaders(headers)
            }).then(function successCallback(response) {
                callback(response);
            }, function errorCallback(response) {
                callback(response);
            });
        }


        /**
         * Executa request tipo DELETE
         * @param url
         * @param method
         * @param parameters
         * @param headers
         * @param callback
         * @return {TransactionModel}
         */
        function del(url, method, parameters, headers, callback) {
            $http({
                method: "DELETE",
                url: url + "/" + method + convertParameters(parameters),
                responseType: "json",
                headers: convertHeaders(headers)
            }).then(function successCallback(response) {
                callback(response.data);
            }, function errorCallback(response) {
                modal(response, $uibModal, $translate)
            });
        }
    }


    /**
     * Converte array de parametros.
     * @param parameters
     * @returns {string}
     */
    function convertParameters(parameters) {
        var stringParameter = "";
        angular.forEach(parameters, function (item) {
            stringParameter += "/" + item;
        });

        return stringParameter;
    }

    /**
     * Converte array de headers
     * @param headers
     */
    function convertHeaders(headers) {
        var newHeaders = [];
        newHeaders['Content-Type'] = "application/json;charset=UTF-8";
        angular.forEach(headers, function (item) {
            newHeaders[item.key] = item.value;
        });

        return newHeaders;
    }


    /**
     * Modal de erro
     * @param response
     * @param $uibModal
     * @param $location
     * @param $translate
     */
    function modal(response, $uibModal, $translate) {
        var message = "";
        var transaction_id = "";

        if (response.data === null) {
            message = $translate.instant("request.message_error_server");
        } else {
            message = response.data.error;
            transaction_id = response.data.transaction_id;
        }

        var modal = $uibModal.open({
            animation: true,
            templateUrl: 'scripts/core/request/request.modal.html',
            keyboard: false,
            backdrop: 'static',
            controller: function DialogController($scope, $uibModalInstance, data, cacheService, requestJsonService) {
                $scope.user = cacheService.get('user');
                $scope.application = cacheService.get('application');
                $scope.message = data.message;
                $scope.transaction_id = data.transaction_id;
                $scope.code = data.code;
                $scope.status = data.status;
                $scope.url = data.url;
                $scope.expiredToken = false;
                $scope.errorNotSent = false;
                $scope.ticket_support = {};

                if (response.status === 417) {
                    $scope.expiredToken = true;
                }

                $scope.closeDialog = function () {
                    $uibModalInstance.close(true);
                };
            }
        });
    }


})();

