/**
 * Controller de carga da aplicação e interface da APP.
 * @namespace app.operation
 */

(function () {
  'use strict';

  angular
    .module('app.operation')
    .controller('AppOperationController', AppOperationController);

    AppOperationController.$inject = ['cacheService', 'operationService'];


  /** @ngInject */
  function AppOperationController(cacheService, operationService) {
      //variáveis da aplicação
      /* jshint validthis: true */
      var vm = this;
      vm.application = null;
      vm.settings = null;
      vm.client = {};
      vm.getOperation = getOperation;
      vm.getBalance = getBalance;

      init();

      //carrega dashboard do desktop
      function init() {
        vm.application = cacheService.get('application');
        vm.settings = cacheService.get('app_settings');
        vm.user = cacheService.get('user');
        vm.getBalance();
        ;
      }

      function getOperation() {
          operationService.consultOperation(vm.user.client_id, vm.user.client_cpf)
              .then(function (result) {
                  vm.client.operation = result;
              });


      }

      function getBalance() {
          operationService.consultBalance(vm.user.client_id)
              .then(function (result) {
                  vm.client.balance = result;
                  vm.getOperation();
              });


      }


  }
})();
