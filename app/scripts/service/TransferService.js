/**
 * Serviço de login no 55PBX
 * @namespace app.core
 */
(function () {
  'use strict';

  angular
    .module('app.core')
    .service('transferService', transferService);

    transferService.$inject = ['requestJsonService', '$q', 'cacheService'];

  /** @ngInject */
  function transferService(requestJsonService, $q, cacheService) {
    return {
        transfer_of_securities:   transfer_of_securities,
        consultTransfer: consultTransfer,
    };

    /**
     * @desc Executa autenticação do usuário na aplicação
     * @param _transfer
     * @return {object}
     */
    function transfer_of_securities(_transfer) {
      var promise_deferred = $q.defer();
      var cache_setting = cacheService.get('app_settings');
      var cache_app = cacheService.get('application');
      var url = cache_setting.api.base;
      var method = cache_setting.api.transfer.post_transfer;
      var headers = [
        {key: 'app_identifier', 'value': cache_app.identifier},
      ];

      var parameters = {
        transfer: _transfer
      };
      requestJsonService.post(url, method, parameters, headers, function (result) {
        promise_deferred.resolve(result);
      });
      return promise_deferred.promise;

    }


    /**
     * @desc Executa alteração de senha do usuário
     * @param _client_id
     * @return {object}
     */
    function consultTransfer(_client_id) {
      var promise_deferred = $q.defer();
      var cache_setting = cacheService.get('app_settings');
      var cache_app = cacheService.get('application');
      var url = cache_setting.api.base;
      var method = cache_setting.api.transfer.get_transfer;
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

