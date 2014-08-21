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
### mileagifyJS.config - Config options
#### unit_system 
METRIC or IMPERIAL. More info https://developers.google.com/maps/documentation/directions/#UnitSystems
#### region
Avoid conflicts in cities with same name. More info https://developers.google.com/maps/documentation/directions/#RegionBiasing
#### avg_consumption
Average fuel consumption (l/100km, litres per 100km) Default 5.0 l/100km
#### price_fuel
Cost of a litre of fuel (no currency) Default 1.4

### mileagifyJS.map - Map module
#### object 
Variable for google.maps.Map object
#### render(idDOMElement, [latitude, longitude])
Render a map with the coords in the selector dom element
#### isValidCoords(latitude, longitude)
Check the coordinates, return TRUE or FALSE
#### getLocation(callback)
Get the position of the device by the HTML5 geolocation API
#### text2LatLng(placetext, callback)
Convert a text (place, street, country, ...) to a coords [lat, lng]

### mileagifyJS.route - Route module
#### setFrom(input, callback) 
Set the start point. Input can be text or coords. Example: "rome, italy" or [41.900233,12.481735]
#### setTo(input, callback) 
Set the end point. Input can be text or coords. Example: "munich, germany" or [48.145931,11.584976]
#### eco
Object for the best fuel saving route. Has render() for display
#### gmDefault
The same for the Google Maps API's default route. Has render() for display
#### showDirections(idDOMElement)
Print the how to go indications in the DOM element with the ID.
#### calculate(from, to, callback)
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
#### getFuelStat(meters)
Return the average fuel consumption per l/100km
#### getCO2Stat(fuel_litres)
Return the CO2 (kg) wasted by fuel consumption
#### getMoneyStat(fuel_litres)
Return the money wasted by fuel consumption


Any feedback is welcome

## Tests
Tests are located in the test folder and are written with Jasmine

## License
MIT License
