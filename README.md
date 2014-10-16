# mileagifyJS
MileagifyJS is a client-side Javascript library built on top of Google Maps API v3 in order to get fuel saving routes and some tools around it like geolocation, fuel consumption, CO2 emissions and estimated money spent.

## Get started
```bash
# Fork or clone the repository
git clone https://github.com/dburgos/mileagifyJS.git
```
Now you can run the examples and see the source code.

## Online demo
Check out the [online demo](http://davidburgosonline.com/mileagify). It's an example app and you can also read the source code.
![Mileagify](http://davidburgosonline.com/wp-content/uploads/2012/10/mileagify_routing_app.jpg)

## API Documentation
###  Config module
#### mileagifyJS.config.unit_system
METRIC (Default) or IMPERIAL. More info https://developers.google.com/maps/documentation/directions/#UnitSystems
```javascript
// Example: set IMPERIAL as Unit System
mileagifyJS.config.unit_system = "IMPERIAL";
```
#### mileagifyJS.config.region
Avoid conflicts in cities with same name. More info https://developers.google.com/maps/documentation/directions/#RegionBiasing
```javascript
// Example: set 'es' for Spain
mileagifyJS.config.region = "es";
```
#### mileagifyJS.config.avg_consumption
Average fuel consumption (l/100km, litres per 100km) Default 5.0 l/100km
```javascript
// Example: set avg fuel consumption to 7.3 l/100km
mileagifyJS.config.avg_consumption = 7.3;
```
#### mileagifyJS.config.price_fuel
Cost of a litre of fuel (no currency) Default 1.4
```javascript
// Example: set fuel cost to 0.86
mileagifyJS.config.price_fuel = 0.86;
```

### Map module
#### mileagifyJS.map.object
Variable for google.maps.Map object
#### mileagifyJS.map.render(idDOMElement, [latitude, longitude])
Render a map with the coords in the selector dom element
```javascript
// Example: render London coords in the #map DOM element
mileagifyJS.map.render('map', [51.519243, -0.127691]);
```
#### mileagifyJS.map.isValidCoords(latitude, longitude)
Check the coordinates, return TRUE or FALSE
```javascript
// Example: check if London coords are valid
mileagifyJS.map.isValidCoords(51.519243, -0.127691); // returns TRUE
// Check random fake coords
mileagifyJS.map.isValidCoords(195.2444, -208.1235); // returns FALSE
```
#### mileagifyJS.map.getLocation(callback)
Get the position of the device by the HTML5 geolocation API
```javascript
// If possible, get device position by HTML5 geolocation API
mileagifyJS.map.getLocation(function(err, location) {
	var lat = location.coords.latitude;
	var lng = location.coords.longitude;
});
```
#### mileagifyJS.map.text2LatLng(placetext, callback)
Convert a text (place, street, country, ...) to a coords [lat, lng]
```javascript
// If possible, get device position by HTML5 geolocation API
mileagifyJS.map.text2LatLng('london', function(latLng) {
	var lat = latLng[0];
	var lng = latLng[1];
});
```

### Route module
#### mileagifyJS.route.setFrom(input, callback)
Set the start point. Input can be text or coords. Example: "rome, italy" or [41.900233,12.481735]
```javascript
// Set from London
mileagifyJS.route.setFrom('london', function() {
  // whatever
  // currently, callback() doesn't return anything
});
// Set from Rome, Italy coords
mileagifyJS.route.setFrom([41.900233,12.481735], function() {
  // whatever
  // currently, callback() doesn't return anything
});
```
#### mileagifyJS.route.setTo(input, callback)
Set the end point. Input can be text or coords. Example: "munich, germany" or [48.145931,11.584976]
```javascript
// Set to London
mileagifyJS.route.setTo('london', function() {
  // whatever
  // currently, callback() doesn't return anything
});
// Set to Rome, Italy coords
mileagifyJS.route.setTo([41.900233,12.481735], function() {
  // whatever
  // currently, callback() doesn't return anything
});
```
#### mileagifyJS.route.eco
Object for the best fuel saving route. Has render() for display
#### mileagifyJS.route.gmDefault
The same for the Google Maps API's default route. Has render() for display
#### showDirections(idDOMElement)
Print the how to go indications in the DOM element with the ID.
#### mileagifyJS.route.calculate(from, to, callback)
Get the fuel saving routes from the start point to end point, return a JSON:
```javascript
// Ouput example
{
  from: { name: 'rome, italy', lat: 41.900233, lng: 12.481735}, // start point data
  to: { name: 'munich, germany', lat: 48.145931, lng: 11.584976},  // end point data
  gm_m: 945202, // meters of the GM API's default route
  gm_s: 47361, // estimated seconds of the GM API's default route
  eco_m: 923620, // meters of the suggested route by MileagifyJS
  eco_s: 30719, // estimated seconds of the suggested route by MileagifyJS
  hasDiff: true // Flag indicating if are the different or not
}
```
#### mileagifyJS.route.getFuelStat(meters)
Return the average fuel consumption per l/100km
```javascript
// Get the fuel consumption (litres/100km)
mileagifyJS.route.getFuelStat(2000);
```
#### mileagifyJS.route.getCO2Stat(fuel_litres)
Return the CO2 (kg) wasted by fuel consumption
```javascript
// Get the CO2 wasted
mileagifyJS.route.getCO2Stat(6.5);
```
#### mileagifyJS.route.getMoneyStat(fuel_litres)
Return the money wasted by fuel consumption
```javascript
// Get the CO2 wasted
mileagifyJS.route.getMoneyStat(16.7);
```

Any feedback is welcome

## Tests
Tests are located in the test folder and are written with Jasmine

## License
MIT License
