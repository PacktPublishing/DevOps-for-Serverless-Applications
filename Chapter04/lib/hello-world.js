class HelloWorld {
    sayHello(event) {
        return {
            message: 'Your Azure function executed successfully!',
            input: event,
        };
    }
}
    
module.exports = HelloWorld;