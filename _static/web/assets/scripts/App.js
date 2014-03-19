define(function(require, exports, module) { // jshint ignore:line
    'use strict';

    var $ = require('jquery');
    var ParallaxView = require('views/ParallaxView');
    var LogUtil = require('./utils/LogUtil');
    var RaysView = require('./views/RaysView');

    /**
     * Initial application setup. Runs once upon every page load.
     *
     * @class App
     * @constructor
     */
    var App = function() {
        this.init();
    };

    /**
     * Initializes the application and kicks off loading of prerequisites.
     *
     * @method init
     * @private
     */
    App.prototype.init = function() {
        // Create your views here
        // Pass in a jQuery reference to DOM elements that need functionality attached to them
        this.parallaxView = new ParallaxView($('.js-scene'));
        this.parallaxCloudView = new ParallaxView($('.js-cloudScene'));
        this.raysView = new RaysView($('#js-rays'));
    };

    module.exports = App;

});
