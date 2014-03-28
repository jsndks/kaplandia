define(function(require, exports, module) {
    'use strict';

    /**
     * Setup a new mapbox object
     *
     * @class mapView
     * @param {jQuery} $element A reference to the containing DOM element.
     * @constructor
     **/
    function mapView($element) {
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
    };

    var proto = mapView.prototype;

    /**
     * Initializes the UI Component View.
     * Runs a single setupHandlers call, followed by createChildren and layout.
     * Exits early if it is already initialized.
     *
     * @method init
     * @returns {mapView}
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
     * @returns {mapView}
     * @private
     */
    proto.setupHandlers = function() {
        // Bind event handlers scope here

        return this;
    };

    /**
     * Create any child objects or references to DOM elements.
     * Should only be run on initialization of the view.
     *
     * @method createChildren
     * @returns {mapView}
     * @private
     */
    proto.createChildren = function() {

        return this;
    };

    /**
     * Remove any child objects or references to DOM elements.
     *
     * @method removeChildren
     * @returns {mapView}
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
     * @returns {mapView}
     * @public
     */
    proto.layout = function() {
        this.createMap();

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
        if (this.isEnabled) {
            return this;
        }
        this.isEnabled = true;

        return this;
    };

    /**
     * Disables the component.
     * Tears down any event binding to handlers.
     * Exits early if it is already disabled.
     *
     * @method disable
     * @returns {mapView}
     * @public
     */
    proto.disable = function() {
        if (!this.isEnabled) {
            return this;
        }
        this.isEnabled = false;

        return this;
    };

    /**
     * Destroys the component.
     * Tears down any events, handlers, elements.
     * Should be called when the object should be left unused.
     *
     * @method destroy
     * @returns {mapView}
     * @public
     */
    proto.destroy = function() {
        this.disable()
            .removeChildren();

        return this;
    };

    //////////////////////////////////////////////////////////////////////////////////
    // HELPER METHODS
    //////////////////////////////////////////////////////////////////////////////////

    /**
     * create the map
     *
     * @method createMap
     * @public
     */
    proto.createMap = function() {
        console.log('load map now ');
        // Transform each venue result into a marker on the map.
        // for (var i = 0; i < result.response.venues.length; i++) {
        //   var venue = result.response.venues[i];
        //   var latlng = L.latLng(venue.location.lat, venue.location.lng);
        //   var marker = L.marker(latlng)
        //     .bindPopup('<h2><a href="https://foursquare.com/v/' + venue.id + '">' +
        //         venue.name + '</a></h2>')
        //     .addTo(foursquarePlaces);
        // }
    };

    //////////////////////////////////////////////////////////////////////////////////
    // EVENT HANDLERS
    //////////////////////////////////////////////////////////////////////////////////



    module.exports = mapView;

});

















































