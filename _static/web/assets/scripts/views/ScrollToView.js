define(function(require, exports, module) {
    'use strict';

    require('scrollTo');

    /**
     * Animates scrolling to anchors on the page
     *
     * @class ScrollToView
     * @param {jQuery} $element A reference to the containing DOM element.
     * @constructor
     **/
    function ScrollToView($element) {

        if (!$element || !$element.length) { return; }
        /**
         * A reference to the containing DOM element.
         *
         * @default null
         * @property $element
         * @type {jQuery}
         * @public
         */
        this.$element = $element;

        this.init();
    }

    var proto = ScrollToView.prototype;

    /**
     * Initializes the UI Component View.
     * Runs a single setupHandlers call, followed by createChildren and layout.
     * Exits early if it is already initialized.
     *
     * @method init
     * @returns {ScrollToView}
     * @private
     */
    proto.init = function() {
        this.setupHandlers()
           .createChildren()
           .layout()
           .enable();

        return this;
    };

    /**
     * Binds the scope of any handler functions.
     * Should only be run on initialization of the view.
     *
     * @method setupHandlers
     * @returns {ScrollToView}
     * @private
     */
    proto.setupHandlers = function() {
        // Bind event handlers scope here
        this.onClickQuickLinkHandler = this.onClickQuickLink.bind(this);

        return this;
    };

    /**
     * Create any child objects or references to DOM elements.
     * Should only be run on initialization of the view.
     *
     * @method createChildren
     * @returns {ScrollToView}
     * @private
     */
    proto.createChildren = function() {

        return this;
    };

    /**
     * Remove any child objects or references to DOM elements.
     *
     * @method removeChildren
     * @returns {ScrollToView}
     * @public
     */
    proto.removeChildren = function() {

        return this;
    };

    /**
     * Performs measurements and applys any positioning style logic.
     * Should be run anytime the parent layout changes.
     *
     * @method layout
     * @returns {ScrollToView}
     * @public
     */
    proto.layout = function() {
        return this;
    };

    /**
     * Enables the component.
     * Performs any event binding to handlers.
     * Exits early if it is already enabled.
     *
     * @method enable
     * @returns {mapView}
     * @public
     */
    proto.enable = function() {
        this.$element.on('click', 'a', this.onClickQuickLinkHandler);

        return this;
    };

    //////////////////////////////////////////////////////////////////////////////////
    // EVENT HANDLERS
    //////////////////////////////////////////////////////////////////////////////////

    /**
     * Quick Link Click Event Handler
     *
     * @method onClickQuickLink
     * @public
     */
    proto.onClickQuickLink = function(e) {
        e.preventDefault

        var $targetEl = $(e.currentTarget);
        var section = $targetEl.attr('href');

        $.scrollTo(section, 800);
    };

    //////////////////////////////////////////////////////////////////////////////////
    // HELPER METHODS
    //////////////////////////////////////////////////////////////////////////////////

    module.exports = ScrollToView;

});

























