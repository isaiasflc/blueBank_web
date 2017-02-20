/**
 * Serviço de login no 55PBX
 * @namespace app.core
 */
(function () {
  'use strict';

  angular
    .module('app.core')
    .service('loginService', loginService);

    loginService.$inject = ['requestJsonService', '$q', 'cacheService'];

  /** @ngInject */
  function loginService(requestJsonService, $q, cacheService) {
    return {
      authenticate: authenticate,
    };

    /**
     * @desc Executa autenticação do usuário na aplicação
     * @param _account
     * @param _agency
     * @param _password 
     * @return {object}
     */
    function authenticate(_account,_agency, _password ) {
      var promise_deferred = $q.defer();
      var cache_setting = cacheService.get('app_settings');
      var cache_app = cacheService.get('application');
      var url = cache_setting.api.base;
      var method = cache_setting.api.login.get_authenticate;
      var headers = [
        {key: 'app_identifier', 'value': cache_app.identifier},
      ];

      var parameters = {
          account: _account,
          agency: _agency,
          password : _password 
      }
      requestJsonService.post(url, method, parameters, headers, function (result) {
        promise_deferred.resolve(result);
      });
      return promise_deferred.promise;

    }
  }
})();

