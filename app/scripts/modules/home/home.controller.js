/**
 * Controller de carga da aplicação e interface da APP.
 * @namespace app.home
 */

(function () {
  'use strict';

  angular
    .module('app.home')
    .controller('AppHomeController', AppHomeController);

    AppHomeController.$inject = ['$state', 'cacheService'];


  /** @ngInject */
  function AppHomeController($state, cacheService) {
      //variáveis da aplicação
      /* jshint validthis: true */
      var vm = this;
      vm.application = null;
      vm.settings = null;
      vm.user = {};
      vm.logout = logout;
      vm.goHome = goHome;
      vm.goTransfer = goTransfer;

      init();

      //carrega dashboard do desktop
      function init() {
        vm.application = cacheService.get('application');
        vm.settings = cacheService.get('app_settings');
        vm.user = cacheService.get('user');
        $state.go('app_operation');
      }


      //executa login do usuário
      function logout() {
          $state.go('app_login');
      }

      function goHome() {
          $state.go('app_operation');
      }
      function goTransfer() {
          $state.go('app_transfer');
      }
  }
})();
