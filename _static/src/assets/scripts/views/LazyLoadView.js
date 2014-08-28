define(function(require, exports, module) {
    'use strict';

    var $ = require('jquery');
    require('lazyload');

    /**
     * Initiates jquery lazy load plugin
     *
     * @class LazyLoadView
     * @param {jQuery} $element A reference to the containing DOM element.
     * @constructor
     **/
    function LazyLoadView($element) {
        /**
         * A reference to the containing DOM element.
         *
         * @default null
         * @property $element
         * @type {jQuery}
         * @public
         */
        this.$element = $element;

        /**
         * Tracks whether component is enabled.
         *
         * @default false
         * @property isEnabled
         * @type {bool}
         * @public
         */
        this.isEnabled = false;

        this.init();
    }

    var proto = LazyLoadView.prototype;

    /**
     * Initializes the UI Component View.
     * Runs a single setupHandlers call, followed by createChildren and layout.
     * Exits early if it is already initialized.
     *
     * @method init
     * @returns {LazyLoadView}
     * @private
     */
    proto.init = function() {
        this.$element.lazyload({effect : "fadeIn"});

        return this;
    };

    module.exports = LazyLoadView;

});