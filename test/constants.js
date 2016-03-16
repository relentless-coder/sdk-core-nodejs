var constants = require('../lib/constants');

// Imports for Test
var should = require('should');

// Variables for test
var pkgJson = require('../package.json');
var prodOriginal = constants.API_BASE_PRODUCTION_URL;
var sandboxOriginal = constants.API_BASE_SANDBOX_URL;

describe('constants', function() {
    it('API_BASE_PRODUCTION_URL should be https://api.mastercard.com', function () {
        constants.API_BASE_PRODUCTION_URL.should.equal("https://api.mastercard.com");
    });

    it('API_BASE_SANDBOX_URL should be https://sandbox.api.mastercard.com', function () {
        constants.API_BASE_SANDBOX_URL.should.equal("https://sandbox.api.mastercard.com");
    });

    it('API_BASE_PRODUCTION_URL can be changed', function () {
        constants.API_BASE_PRODUCTION_URL = "https://mock.com";
        constants.API_BASE_PRODUCTION_URL.should.equal("https://mock.com");
    });

    it('API_BASE_SANDBOX_URL can be changed', function () {
        constants.API_BASE_SANDBOX_URL = "https://mock.com";
        constants.API_BASE_SANDBOX_URL.should.equal("https://mock.com");
    });

    it('Version is same as package.json', function () {
        constants.VERSION = pkgJson.version;
    });

    after('cleanup constants', function() {
        (constants.API_BASE_PRODUCTION_URL = prodOriginal).should.equal("https://api.mastercard.com");
        (constants.API_BASE_SANDBOX_URL = sandboxOriginal).should.equal("https://sandbox.api.mastercard.com");
    });
});