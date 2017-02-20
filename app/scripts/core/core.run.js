/**
 * Módulo de carga de aplicações.
 * @namespace app.core
 * @description Parametrização de inicializaçao da aplicação.
 */



(function () {
    'use strict';

    angular
        .module('app.core')
        .run(runConfig);

    runConfig.$inject = ['$rootScope', '$state', '$http', 'exceptionService', 'cacheService', 'bootstrap3ElementModifier', 'defaultErrorMessageResolver', 'applicationService', 'tmhDynamicLocale'];

    /** @ngInject */
    function runConfig($rootScope, $state, $http, exceptionService, cacheService, bootstrap3ElementModifier, defaultErrorMessageResolver, applicationService, tmhDynamicLocale) {

        //validação de forms
        bootstrap3ElementModifier.enableValidationStateIcons(false);
        defaultErrorMessageResolver.setI18nFileRootPath('../../bower_components/angular-auto-validate/dist/lang');
        defaultErrorMessageResolver.setCulture('pt-BR');

        //carregar as configurações
        $http.get('api_settings.json')
            .then(function successCallback(response_api) {
                var api_settings = response_api.data;
                $http.get('function_settings.json')
                    .then(function successCallback(response_function) {
                        var function_settings = response_function.data;

                        $http.get('app_settings.json')
                            .then(function successCallback(response) {
                                var settings = response.data;

                                //salvando cache
                                cacheService.removeAll();
                                cacheService.put('app_settings', settings);

                                //definindo rotas da aplicação
                                $rootScope.app_title = settings.initial_name;
                                $rootScope.user_permission = 0;

                                //locale da aplicaçao
                                tmhDynamicLocale.set(settings.locale);

                                //dados de api
                                settings.api = api_settings.services;
                                if (settings.mode == 'dev') {
                                    settings.api.base = settings.api_url.dev.base;
                                    settings.api.socket = settings.api_url.dev.socket;
                                } else if (settings.mode == 'homologa') {
                                    settings.api.base = settings.api_url.homologa.base;
                                    settings.api.socket = settings.api_url.homologa.socket;
                                } else if (settings.mode == 'production') {
                                    settings.api.base = settings.api_url.production.base;
                                    settings.api.socket = settings.api_url.production.socket;
                                }

                                //controle de acesso das controllers
                                settings.controller_permission = function_settings.controller_permission;

                                applicationService.getInformationByDomain(location.hostname)
                                    .then(function (result) {
                                        cacheService.put('application', result);

                                        $rootScope.app_title = result.name;
                                        $state.go('app_login');
                                    });
                            }, function errorCallback(response) {
                                exceptionService.process('Application settings undefined!', response.data);
                            });

                    }, function errorCallback(response) {
                        exceptionService.process('Application settings undefined!', response.data);
                    });
            }, function errorCallback(response) {
                exceptionService.process('Application settings undefined!', response.data);
            });
    }

})();


