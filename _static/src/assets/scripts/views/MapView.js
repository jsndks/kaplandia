define(function(require, exports, module) {
    'use strict';

    require('konamijs');
    require('handlebars');
    require('utils/templates');

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

        // var easter_egg = new Konami(this.init.bind(this));
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
        this.getPinData();

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
        var map = L.mapbox.map('map', 'jdicks.hm4han6c')
            // .addControl(L.mapbox.geocoderControl('jdicks.hl51p5gl'))
            .setView([33, -100], 4);

        // Keep our place markers organized in a nice group.
        var featureLayer = L.mapbox.featureLayer().addTo(map);

        // Transform each venue result into a marker on the map.
        var line = [];
        for (var i = 0; i < pinData.length; i++) {
            var pin = pinData[i];
            var latlng = L.latLng(pin.lat, pin.lng);
            line.push(latlng);

            var template = Kap.Templates.popupTemplate;
            var html = template({
                title: pin.title,
                address: pin.address,
                description: pin.description,
                posts: pin.posts
            });

            var myIcon = L.icon({
                iconUrl: '_static/web/assets/media/images/marker.png',
                iconSize: [43, 52],
                iconAnchor: [21, 52],
                popupAnchor: [0, -52]
            });

            var marker = L.marker(latlng, {icon: myIcon})
                .bindPopup(html)
                .addTo(featureLayer);
        }

        var polyline_options = {
            color: '#000'
        };

        var polyline = L.polyline(line, polyline_options).addTo(map);

        window.setTimeout(function() {
            map.fitBounds(featureLayer.getBounds(), {
                padding: [100, 100]
            }, 0);
        });
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

            var $posts = $(location).find('.posts > li');
            var t = 0;
            var postsLength = $posts.length;
            var pinPosts = [];

            if (postsLength != 0) {
                for (; t < postsLength; t++) {
                    var post = $posts[t];
                    var $post = $(post).find('a');
                    var postData = {
                        title: $post.text(),
                        url: $post.attr('href')
                    };
                    pinPosts.push(postData);
                }
            }

            var address = [];
            var $addressList = $(location).find('.address > li');
            $addressList.each(function() {
                var txt = $(this).text();
                address.push($(this).text());
            });

            var pinData = {
                title: $(location).data('title'),
                date: $(location).find('date').text(),
                address: address,
                description: $(location).data('description'),
                lat: $(location).data('lat'),
                lng: $(location).data('lng'),
                posts: pinPosts
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












