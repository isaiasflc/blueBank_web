/**
 * Controller de carga da aplicação e interface da APP.
 * @namespace app.transfer
 */

(function () {
  'use strict';

  angular
    .module('app.transfer')
    .controller('AppTransferController', AppTransferController);

    AppTransferController.$inject = ['cacheService', 'transferService'];


  /** @ngInject */
  function AppTransferController(cacheService, transferService) {
      //variáveis da aplicação
      /* jshint validthis: true */
      var vm = this;
      vm.application = null;
      vm.settings = null;
      vm.title = null;
      vm.transfer = {};
      vm.lista_transfer = [];
      vm.postTransfer = postTransfer;
      vm.getTransfer = getTransfer;

      init();

      //carrega dashboard do desktop
      function init() {
        vm.application = cacheService.get('application');
        vm.settings = cacheService.get('app_settings');
        vm.user = cacheService.get('user');
        vm.getTransfer();
      }

      function postTransfer(_form) {
          if (_form.$valid) {
            vm.transfer.client_id_transfer = vm.user.client_id;
              transferService.transfer_of_securities(vm.transfer)
                  .then(function (result) {
                      vm.lista_transfer = result;
                  });

          }
      }

      function getTransfer() {
          transferService.consultTransfer(vm.user.client_id)
              .then(function (result) {
                  vm.lista_transfer = result;
              });
      }

  }
})();
