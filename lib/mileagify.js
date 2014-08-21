"use strict";

var mileagifyJS = mileagifyJS || {};

/* Config JSON */
mileagifyJS.config = {
    // Unit system (METRIC or IMPERIAL) More info https://developers.google.com/maps/documentation/directions/#UnitSystems
    unit_system: "METRIC",
    // Region (avoid conflicts) More info https://developers.google.com/maps/documentation/directions/#RegionBiasing
    region: "es",
    // Average fuel consumption (l/100km, litres per 100km)
    avg_consumption: 5,
    // Cost of a litre of fuel (ie 1.4€/l or $1.4/l)
    price_fuel: 1.4
};
/* Map Module */
mileagifyJS.map = function(){
    // Map object
    var map = null;
    // Map's properties
    var options = {
      zoom: 3,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [  { featureType: "all", stylers: [ { saturation: 10 } ] }   ]
    };
    // Render a map with the @location in the @selector dom element
    var render = function(selector, location) {
        // Set the location
        options.center = new google.maps.LatLng(location[0], location[1]);
        // Create the map
        mileagifyJS.map.object = new google.maps.Map(document.getElementById(selector), options);
        // Create the directions renderer
        mileagifyJS.route.directionsDisplay = new google.maps.DirectionsRenderer();
        // Link both
        mileagifyJS.route.directionsDisplay.setMap(mileagifyJS.map.object);
    };
    // Check the coordinates
    var isValidCoords = function(latitude, longitude)
    {
        /*  
         *  - latitude coordinate in degrees, as a number between -90 and +90
         *  - longitude coordinate in degrees, as a number between -180 and +180
         *  Please check https://developers.google.com/maps/documentation/javascript/v2/reference#GLatLng for more info
         * */
        this.isNumber = function(n) 
        {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }
    
        return this.isNumber(latitude) && latitude <= 90 && latitude >= -90 
                && this.isNumber(longitude) && longitude <= 180 && longitude >= -180;
    };
    // Get the position of the device by the HTML5 geolocation API
    var getLocation = function(callback)
    {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){
                callback(null, position);
            });
        } else {
            callback("Your device doesn't support geolocation", null);
        }
    };
    // Convert a text (place, street, country, ...) to a coords (lat, lng)
    var text2LatLng = function(place, callback)
    {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': place }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var location = results[0].geometry.location;
                var latLng = [
                    location[Object.keys(location)[0]],
                    location[Object.keys(location)[1]]
                ];
                callback(null, latLng);
            } else {
                callback("Geocode was not successful due: " + status, null);
            }
        });
    };
    // Module's output
    var exports = {
        object: map,
        render: render,
        isValidCoords: isValidCoords,
        text2LatLng: text2LatLng,
        getLocation: getLocation
    };
    return exports;
}();
/* Route Module */
mileagifyJS.route = function(){
    // Start point
    var from = {
        name: "",
        lat: null,
        lng: null
    };
    // End point
    var to = {
        name: "",
        lat: null,
        lng: null
    };
    // GM API's directions renderer object
    var directionsDisplay = new google.maps.DirectionsRenderer();
    // GM API's route request object
    var request = {
        unitSystem: google.maps.DirectionsUnitSystem[mileagifyJS.config.unit_system],
        region: mileagifyJS.config.region,
        optimizeWaypoints: true,
        travelMode: google.maps.DirectionsTravelMode["DRIVING"],
        provideRouteAlternatives: true
    };
    // Mileagify's suggested route 
    var eco = {
        data: null,
        path: null,
        render: function() {
            // Graphics
            var path = new google.maps.Polyline({
                path: this.data,
                strokeColor: '#7FFF00',
                opacity: 0.5,
                zIndex: 2,
                strokeWeight: 4
            });
            // Delete the previous if exists
            if(this.path){
                this.path.setMap(null);
            }
            // Render
            path.setMap(mileagifyJS.map.object);
            this.path = path;
        }
    };
    // Google Maps' suggested route
    var gmDefault = {
        data: null,
        path: null,
        render: function() {
            // Graphics
            var path = new google.maps.Polyline({
                path: this.data,
                strokeColor: '#7F00FF',
                opacity: 0.7,
                zIndex: 1,
                strokeWeight: 3
            });
            // Delete the previous if exists
            if(this.path){
                this.path.setMap(null);
            }
            // Render
            path.setMap(mileagifyJS.map.object);
            this.path = path;
        }
    };
    // Setter of the start point
    // Supports arrays for coords (ie: [30.44, -24.79]) or plain text (ie: "madrid, spain")
    var setFrom = function(input, callback) {
        // Check for array or JSON
        if(typeof input == "object") {
            from.name = input;
            from.lat = input[0];
            from.lng = input[1];
        } else {
            // Process as string
            from.name = input;
            from.lat = input.split(",",2)[0];
            from.lng = input.split(",",2)[1];
        }
        // Check the coords
        if(mileagifyJS.map.isValidCoords(from.lat, from.lng)) {
            request.origin = new google.maps.LatLng(from.lat, from.lng);
            callback();
        } else {
            // Decode the text
            mileagifyJS.map.text2LatLng(from.name, function(err, latlng) {
                to.lat = latlng[0];
                to.lng = latlng[1];
                request.origin = latlng[0] + ", " + latlng[1];
                callback();
            });
        }
    };
    // Setter of the end point
    // Supports arrays for coords (ie: [30.44, -24.79]) or plain text (ie: "madrid, spain")
    var setTo = function(input, callback) {
        // Check for array
        if(typeof input == "object") {
            to.name = input;
            to.lat = input[0];
            to.lng = input[1];
        } else {
            // Process as string
            to.name = input;
            to.lat = input.split(",",2)[0];
            to.lng = input.split(",",2)[1];
        }
        // Check the coords
        if(mileagifyJS.map.isValidCoords(to.lat, to.lng)) {
            request.destination = new google.maps.LatLng(to.lat, to.lng);
            callback();
        } else {
            // Decode the text
            mileagifyJS.map.text2LatLng(to.name, function(err, latlng) {
                to.lat = latlng[0];
                to.lng = latlng[1];
                request.destination = latlng[0] + ", " + latlng[1];
                callback();
            });
        }
    };
    // Routes sorter
    var ecoSort = function(element1, element2)
    {
        /* Please check http://www.w3schools.com/jsref/jsref_sort.asp for more info */
        return element1.legs[0].distance.value - element2.legs[0].distance.value;
    };
    // Get the fuel consumption by distance
    var getFuelStat = function(distance_m)
    {
        // 5 l/100km avg consumption
        return ((distance_m/1000)*mileagifyJS.config.avg_consumption/100).toFixed(2);
    };
    // Get the CO2 (kg) wasted by fuel consumption
    var getCO2Stat = function(fuel_l)
    {
        // More info http://www.ecoscore.be/en/book/export/html/201
        // 2.6 diesel and 2.4 petrol = 2.5 average
        return (fuel_l*2.5).toFixed(2);
    };
    // Get the money wasted by fuel consumption
    var getMoneyStat = function(fuel_l)
    {
        return (fuel_l*mileagifyJS.config.price_fuel).toFixed(2);
    };
    // Render the how-to-go directions into the @domElement
    var showDirections = function(selector) {
        this.directionsDisplay.setPanel(document.getElementById(selector));
    };
    // Get the routes from @from point to @to point
    var calculate = function(from, to, callback)
    {
        var self = this;
        // Set start point
        self.setFrom(from, function() {
            // And end point
            self.setTo(to, function() {
                // First request of routes
                request.avoidTolls = true;
                var directionsService = new google.maps.DirectionsService();
                directionsService.route(request, function(result, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        // Second request of routes
                        request.avoidTolls = false;
                        directionsService.route(request, function(result2, status2) {
                            if (status == google.maps.DirectionsStatus.OK) {
                                // Get the GM's default route & save it
                                self.gmDefault.data = result.routes[0].overview_path;
                                // Join all routes
                                result.routes = result.routes.concat(result2.routes);
                                // Making the output
                                var output = {
                                    from: from,
                                    to: to,
                                    gm_m: result.routes[0].legs[0].distance.value,
                                    gm_s: result.routes[0].legs[0].duration.value
                                };
                                // Sorting
                                result.routes.sort(ecoSort);
                                // Remove the last results if there are too much
                                if (result.routes.length > 5)
                                {
                                    result.routes.splice(result.routes.length-1,1);
                                }
                                // Save the routes for displaying
                                self.directionsDisplay.setDirections(result);
                                // Get the eco route & save it
                                self.eco.data = result.routes[0].overview_path;
                                // Save the eco route data into the output
                                output.eco_m = result.routes[0].legs[0].distance.value;
                                output.eco_s = result.routes[0].legs[0].duration.value;
                                output.hasDiff = output.gm_m != output.eco_m;
                                callback(null, output);
                            } else {
                                callback(status2, null)
                            }
                        });
                    } else {
                        callback(status, null);
                    }
                });
            });
        });
    };
    // Module's output
    var exports = {
        setFrom: setFrom,
        setTo: setTo,
        eco: eco,
        gmDefault: gmDefault,
        directionsDisplay: directionsDisplay,
        getFuelStat: getFuelStat,
        getCO2Stat: getCO2Stat,
        getMoneyStat: getMoneyStat,
        showDirections: showDirections,
        calculate: calculate
    };
    return exports;
}();