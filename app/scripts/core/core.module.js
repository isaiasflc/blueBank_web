/**
 * @author Flavio Franco Jr.
 * @description Módulo principal de carga da aplicação
 * @namespace app.core
 */
(function () {
    'use strict';

    angular.module('app.core', [
        'app.request',
        'app.tools',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'pascalprecht.translate',
        'ngAnimate',
        'tmh.dynamicLocale',
        'ui.sortable',
        'ui.router',
        'ngTouch',
        'jcs-autoValidate',
        'ui.utils.masks',
        'uimaskmoney',
        'ngLodash',
        'angular-loading-bar',
        'ui.mask',
        'ngCookies',
        'ngSanitize',
        'ui.bootstrap',
        'toggle-switch',
        'angularRandomString',
        'ngFileUpload'
    ])
})();


