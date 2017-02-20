/**
 * Módulo de carga de interface e layout.
 * @namespace app.55pbx
 */
(function () {
  'use strict';

  angular.module('app.home', [
    'ui.router'
  ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('app_home', {
        templateUrl: 'scripts/modules/home/home.html',
        controller: 'AppHomeController',
        controllerAs: 'vm',
      })

  }
})();

