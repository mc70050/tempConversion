'use strict';
// The same-value package allows a method to check the equality of strings
// For more information, please see https://www.npmjs.com/package/same-value
const same = require('same-value');
// The round-to package gives three methods: roundTo, roundTo.up, roundTo.down for rounding floating numbers.
// For more information, please see https://www.npmjs.com/package/round-to
const roundTo = require('round-to');

console.log('Loading function');

// Handler for the event.
exports.handler = (event, context, callback) => {
	// Initialize variables
	// The 'temp' after event is the name of the value in the JSON data sent to lambda function
	var initialTemp = event.temp;
	var unit = event.type;
	var message;
	var result;
	console.log("unit is " + unit);
	// Check the unit and call the corresponding helper function to do the right conversion
	if (same(unit,'Fahrenheit')) {
		result = convertToCelcius(initialTemp);
		message = initialTemp + " Fahrenheit is " + result + " Celsius";
	} else {
		result = convertToFahrenheit(initialTemp);
		message = initialTemp + " Celsius is " + result + " Fahrenheit";
	}
	// Create the response in JSON format
	const response = {
		body: message
	};
	
    console.log('value1 =', initialTemp);
	console.log(response);
    callback(null, response);  
    //callback('Something went wrong');
};	// End of handler

// All helper functions exist here outside the handler.

function convertToCelcius(temp) {
	console.log("temperature is " + temp);
	var tmp = (temp - 32) / 1.8;
	return roundTo(tmp,2);
}

function convertToFahrenheit(temp) {
	var tmp = temp * 1.8 + 32;
	return roundTo(tmp,2);
}
