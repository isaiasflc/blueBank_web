/**
 * Serviço de dados da aplicação
 * @namespace app.core
 */
(function () {
  'use strict';

  angular
    .module('app.core')
    .service('applicationService', applicationService);

  applicationService.$inject = ['requestJsonService', '$q', 'cacheService'];

  /** @ngInject */
  /**
   * @namespace UserClientPbxService
   * @desc Application Angular Cache
   * @memberOf Tools
   */
  function applicationService(requestJsonService, $q, cacheService) {
    return {
      getInformationByDomain: getInformationByDomain,

    };


    /**
     * @desc Obtem dados básicos de uma aplicação por dominio informado
     * @param _domain
     * @return {ApplicationModel}
     */
    function getInformationByDomain(_domain) {
      var promise_deferred = $q.defer();
      var cache_setting = cacheService.get('app_settings');
      var url = cache_setting.api.base;
      var method = cache_setting.api.general.application.get_information_domain;
      var parameters = [_domain];
      requestJsonService.get(url, method, parameters, null, function (result) {
        promise_deferred.resolve(result);
      });
      return promise_deferred.promise;
    }

  }
})();


