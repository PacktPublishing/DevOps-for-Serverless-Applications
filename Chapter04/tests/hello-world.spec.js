const HelloWorld = require('../lib/hello-world');

describe('sayHello', () => {
    var event = {};
    var hWorld = new HelloWorld();

    it('should call sayHello and return message', () => {
        expect(hWorld.sayHello(event).message).toBe('Your Azure function executed successfully!');
    });
});
