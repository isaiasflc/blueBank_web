/**
 * Controller de carga da aplicação e interface da APP.
 * @namespace app.desktop
 */

(function () {
  'use strict';

  angular
    .module('app.login')
    .controller('AppLoginController', AppLoginController);

  AppLoginController.$inject = ['$state', 'cacheService', 'loginService'];


  /** @ngInject */
  function AppLoginController($state, cacheService, loginService) {
    //variáveis da aplicação
    /* jshint validthis: true */
    var vm = this;
    vm.application = null;
    vm.settings = null;
    vm.title = null;
    vm.user = {};
    vm.login = login;

    init();

    //carrega cache
    function init() {
      vm.application = cacheService.get('application');
      vm.settings = cacheService.get('app_settings');
    }


    //executa login do usuário
    function login(form) {
      if (form.$valid) {
        if (vm.user.account != undefined && vm.user.agency != undefined, vm.user.password != undefined) {
            loginService.authenticate(vm.user.account, vm.user.agency, vm.user.password)
            .then(function (result) {
                cacheService.put('user', result);
                $state.go('app_home');
            });
        }
      }
    }

  }
})();
