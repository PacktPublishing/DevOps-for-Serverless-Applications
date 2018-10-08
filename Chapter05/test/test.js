var assert = require('assert');
var weather = require('../handler.js');
var openwhisk = require('openwhisk');
var ow;

/**
 * Create a function which delegates to openwhisk to run a function f
 */
function makeAdapter(f) {
    return function(params) {
        return ow.actions.invoke({name: f,
                                  blocking: true,
                                  result:true,
                                  params:params});
    };
}

/**
 * For each function in an object, create an openwhisk adapter.
 * return an object with each adapter function.
 */
function adapt(obj) {
    var adapter= {}
    for (var p in obj) {
        adapter[p] =  makeAdapter(p)
    }
    return adapter;
}


describe('handler', function() {
    
    before( function() {
        if (process.env.TEST_OPENWHISK) {
           options = { apihost: process.env.OPENWHISK_HOST,
                       api_key: process.env.OW_AUTH_KEY };
           ow = openwhisk(options);
           hello = adapt(hello,ow);
        }
    });

    describe('handler', function() {
        it('should throw an error when location is not present', function() {
            var params = {}
            return weather.main(params).then(function(result) {
                assert(false);
            }).catch(function(err) {
                assert(true);
            });
        });
    });

    describe('hello', function() {
        it('should return code as 29 for location as paris!', function() {
            var params = { 'location': 'paris' };

            return weather.main(params).then(function(result) {
                assert.notEqual(result.body.message,"Error processing your request");
                assert.equal(result.body.code,"29");
            })
        });
    });

});
