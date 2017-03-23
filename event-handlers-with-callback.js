const {
    defineSupportCode
} = require('cucumber');
const {
    client
} = require('nightwatch-cucumber');


defineSupportCode(({
    registerHandler
}) => {
    registerHandler('BeforeFeatures', function () {
        client.pause('1000');
    });

    registerHandler('BeforeFeature', function () {
        client.pause('1000');
    });

    registerHandler('BeforeScenario', function () {
        client.pause('1000');
    });

    registerHandler('BeforeStep', function () {
        client.pause('1000');
    });

    registerHandler('AfterStep', function () {
        client.pause('1000');
    });

    registerHandler('AfterScenario', function () {
        client.pause('1000');

    });

    registerHandler('AfterFeature', function () {
        client.pause('1000');
    });

    registerHandler('AfterFeatures', function () {
        client.pause('1000');
    });
});