/**
 * @namespace app.core
 * @description Configuração da aplicação
 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .config(coreConfig);

    coreConfig.$inject = ['$translateProvider', '$provide', 'tmhDynamicLocaleProvider'];

    /** @ngInject */
    function coreConfig($translateProvider, $provide, tmhDynamicLocaleProvider) {

        //Tratamento de exeception
        $provide.decorator('$exceptionHandler', extendExceptionHandler);

        //locale
        tmhDynamicLocaleProvider.localeLocationPattern('../../bower_components/angular-i18n/angular-locale_{{locale}}.js');
        $translateProvider.useSanitizeValueStrategy(null);
        $translateProvider.useLoaderCache(true);
    }

    /**
     * @name extendExceptionHandler
     * @desc Tratamento de Execeções
     * @param {String} msg Message to log
     * @returns {Object}
     * @memberOf Tools.Exception
     */
    function extendExceptionHandler($delegate) {
        return function (exception, cause) {
            $delegate(exception, cause);
            var errorData = {
                exception: exception,
                cause: cause
            };
            console.log(errorData);
        };
    }
})();


