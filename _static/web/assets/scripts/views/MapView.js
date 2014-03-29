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
        this.getPinData();

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
    proto.createMap = function(pinData) {
        var map = L.mapbox.map('map', 'jdicks.hl51p5gl')
            // .addControl(L.mapbox.geocoderControl('jdicks.hl51p5gl'))
            .setView([33, -100], 4);

        // Transform each venue result into a marker on the map.
        var line = [];
        for (var i = 0; i < pinData.length; i++) {
            var venue = pinData[i];
            var latlng = L.latLng(venue.lat, venue.lng);
            line.push(latlng);
            var marker = L.marker(latlng)
                .bindPopup('<h2>' + venue.title + '</h2>' + '<br />' + '<a href="#">' + venue.post + '</a>')
                .addTo(map);
        }

        var polyline_options = {
            color: '#000'
        };

        var polyline = L.polyline(line, polyline_options).addTo(map);
    };

    /**
     * Get the pin data
     *
     * @method getPinData
     * @public
     */
    proto.getPinData = function() {
        var i = 0;
        this.pinData = [];
        var $locations = $('.locations > li');
        var l = $locations.length;
        for (; i < l; i++) {
            var location = $locations[i];

            var $posts = $(location).find('.posts');
            var t = 0;
            var postsLength = $posts.length;

            for (; t < postsLength; t++) {
                var post = $posts[t];
                var $post = $(post).find('a').html();
            }

            var pinData = {
                title: $(location).data('title'),
                lat: $(location).data('lat'),
                lng: $(location).data('lng'),
                post: $post
            };
            this.pinData.push(pinData);
        }

        this.createMap(this.pinData);

    };

    //////////////////////////////////////////////////////////////////////////////////
    // EVENT HANDLERS
    //////////////////////////////////////////////////////////////////////////////////



    module.exports = mapView;

});

















































