'use strict';

/**
  * main() will be invoked when you Run This Action.
  *
  * When enabled as a Web Action, use the following URL to invoke this action:
  * https://{APIHOST}/api/v1/web/{QUALIFIED ACTION NAME}?location=Austin
  *
  * For example:
  * https://openwhisk.ng.bluemix.net/api/v1/web/myusername@us.ibm.com_myspace/get-resource/weather?location=Austin
  *
  * In this case, the params variable will look like:
  *     { "location": "Austin" }
  *
  */

  var request = require('request');

  function main(params) {
      var location = params.location || 'Vermont';
      var url = 'https://query.yahooapis.com/v1/public/yql?q=select item.condition from weather.forecast \
          where woeid in (select woeid from geo.places(1) where text="' + location + '")&format=json';
      return new Promise(function(resolve, reject) {
          request.get(url, function(error, response, body) {
              if (error) {
                  reject({
                      statusCode: 500,
                      headers: { 'Content-Type': 'application/json' },
                      body: {'message': 'Error processing your request'}
                  });
              }
              else {
                  /** The response body contains temperature data in the following format
                   *    { code: '28',
                   *    date: 'Tue, 26 Dec 2017 12:00 PM EST',
                   *    temp: '18',
                   *    text: 'Mostly Cloudy' } }
                    */
                  resolve({
                      statusCode: 200,
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.parse(body).query.results.channel.item.condition
                  });
              }
          });
      });
  }
  
  exports.main = main;