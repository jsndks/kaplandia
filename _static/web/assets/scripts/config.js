/**
 * Application configuration declaration.
 *
 * This configuration file is shared between the website and the build script so
 * that values don't have to be duplicated across environments. Any non-shared,
 * environment-specific configuration should placed in appropriate configuration
 * files.
 *
 * Paths to vendor libraries may be added here to provide short aliases to
 * otherwise long and arbitrary paths. If you're using bower to manage vendor
 * scripts, running `grunt install` will automatically add paths aliases as
 * needed.
 *
 * @example
 *     paths: {
 *         'jquery': '../vendor/jquery/jquery',
 *         'jquery-ui': '../vendor/jquery-ui/ui/jquery-ui'
 *     }
 *
 * Shims provide a means of managing dependencies for non-modular, or non-AMD
 * scripts. For example, jQuery UI depends on jQuery, but it assumes jQuery is
 * available globally. Because RequireJS loads scripts asynchronously, jQuery
 * may or may not be available which will cause a runtime error. Shims solve
 * this problem.
 *
 * @example
 *     shim: {
 *         'jquery-ui': ['jquery']
 *     }
 */
require.config({
    paths: {
        // this empty string tells r.js to use single quotes when installing
        // bower modules automatically. Otherwise defaults to double quotes.
        'requirejs': '',
        'jquery': '../vendor/jquery/jquery',
        'parallax': '../vendor/parallax/deploy/parallax',
        'snap': '../vendor/Snap.svg/dist/snap.svg',
        'handlebars': '../vendor/handlebars/handlebars',
        'text': '../vendor/text/text',
        'scrollTo': '../vendor/jquery.scrollTo/jquery.scrollTo',
        'konamijs': 'lib-thirdparty/konami',
        'lazyload': '../vendor/jquery.lazyload/jquery.lazyload'
    },

    shim: {
        jquery: {
            exports: 'jQuery'
        },
        handlebars: {
            exports: 'Handlebars',
        },
        scrollTo: {
            deps: ['jquery']
        },
        lazyload: {
            deps: ['jquery']
        }
    },

    waitSeconds: 120
});
