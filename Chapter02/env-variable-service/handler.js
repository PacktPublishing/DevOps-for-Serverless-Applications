'use strict';

module.exports.hello = (event, context, callback) => {
  
  const response = {
    statusCode: 200, 
    body: JSON.stringify({
      message: `my favourite animal is ${process.env.MY_VAR} and ${process.env.MYSECRET_VAR}`,
      input: event,
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
