/**
 * Módulo de carga de interface e layout.
 * @namespace app.transfer
 */
(function () {
  'use strict';

  angular.module('app.transfer', [
    'ui.router'
  ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('app_transfer', {
        parent: 'app_home',
        templateUrl: 'scripts/modules/transfer/transfer.html',
        controller: 'AppTransferController',
        controllerAs: 'vm',
      })

  }
})();

