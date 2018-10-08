const HelloWorld = require('./lib/hello-world');

module.exports = function (context, req, event) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var hlloWorld = new HelloWorld();

    if (req.query.name || (req.body && req.body.name)) {
        context.res = {
            // status: 200, /* Defaults to 200 */
  //          body: "Hello " + (req.query.name || req.body.name)
              body: "Hello "+ (req.query.name || req.body.name) + JSON.stringify(hlloWorld.sayHello(event))
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
    context.done();
};
