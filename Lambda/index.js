'use strict';
const same = require('same-value');
const roundTo = require('round-to');

console.log('Loading function');

exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));
	var initialTemp = event.temp;
	var unit = event.type;
	var message;
	var result;
	console.log("unit is " + unit);
	if (same(unit,'Fahrenheit')) {
		result = convertToCelcius(initialTemp);
		message = initialTemp + " Fahrenheit is " + result + " Celsius";
	} else {
		result = convertToFahrenheit(initialTemp);
		message = initialTemp + " Celsius is " + result + " Fahrenheit";
	}
	const response = {
		body: message
	};
	
	// the 'temp' after event is the name of the value in the JSON data sent to lambda function,
    console.log('value1 =', initialTemp);
	console.log(response);
    callback(null, response);  
    //callback('Something went wrong');
};

function convertToCelcius(temp) {
	console.log("temperature is " + temp);
	var tmp = (temp - 32) / 1.8;
	return roundTo(tmp,2);
}

function convertToFahrenheit(temp) {
	var tmp = temp * 1.8 + 32;
	return roundTo(tmp,2);
}
