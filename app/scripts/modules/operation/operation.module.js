/**
 * Módulo de carga de interface e layout.
 * @namespace app.operation
 */
(function () {
  'use strict';

  angular.module('app.operation', [
    'ui.router'
  ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('app_operation', {
        parent: 'app_home',
        templateUrl: 'scripts/modules/operation/operation.html',
        controller: 'AppOperationController',
        controllerAs: 'vm',
      })

  }
})();

