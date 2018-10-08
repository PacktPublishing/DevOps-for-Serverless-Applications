module.exports.hello = (event, context, callback) => { 
  const response = { 
      statusCode: 200, 
      body: 'Hey my version is running with the hooks!' 
  };

  callback(null, response);
};