/**
 * Módulo de carga de interface e layout.
 * @namespace app.55pbx
 */
(function () {
  'use strict';

  angular.module('app.login', [
    'ui.router'
  ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('app_login', {
        templateUrl: 'scripts/modules/login/login.html',
        controller: 'AppLoginController',
        controllerAs: 'vm',
      })
  }
})();

