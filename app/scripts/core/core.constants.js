/**
 * Módulo de carga de aplicações.
 * @namespace app.core
 * @description Parametrização de inicializaçao da aplicação.
 */

(function () {
    'use strict';

    angular
        .module('app.core')
        .constant('constant_app_path', {
            modules: 'app/scripts/modules/blueBrank',
            modules_application: 'app/scripts/modules/application',
            bower: '../../bower_components/'
        })
})();


