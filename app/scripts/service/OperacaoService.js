/**
 * Serviço de operação
 * @namespace app.core
 */
(function () {
  'use strict';

  angular
    .module('app.core')
    .service('operationService', operationService);

    operationService.$inject = ['requestJsonService', '$q', 'cacheService'];

  /** @ngInject */
  function operationService(requestJsonService, $q, cacheService) {
    return {
        consultOperation: consultOperation,
        consultBalance: consultBalance
    };

    /**
     * @desc Executa consulta de operações
     * @param _client_id
     * @param _client_cpf
     * @return {object}
     */
    function consultOperation(_client_id, _client_cpf) {
      var promise_deferred = $q.defer();
      var cache_setting = cacheService.get('app_settings');
      var cache_app = cacheService.get('application');
      var url = cache_setting.api.base;
      var method = cache_setting.api.operation.get_operation;
      var headers = [
        {key: 'app_identifier', 'value': cache_app.identifier},
      ];
      var parameters = [_client_id, _client_cpf];
      requestJsonService.get(url, method, parameters, headers, function (result) {
        promise_deferred.resolve(result);
      });
      return promise_deferred.promise;
    }

      /**
       * @desc Executa busca de saldo
       * @param _client_id
       * @return {object}
       */
      function consultBalance(_client_id) {
          var promise_deferred = $q.defer();
          var cache_setting = cacheService.get('app_settings');
          var cache_app = cacheService.get('application');
          var url = cache_setting.api.base;
          var method = cache_setting.api.operation.get_balance;
          var headers = [
              {key: 'app_identifier', 'value': cache_app.identifier},
          ];
          var parameters = [_client_id];
          requestJsonService.get(url, method, parameters, headers, function (result) {
              promise_deferred.resolve(result);
          });
          return promise_deferred.promise;
      }



  }
})();

