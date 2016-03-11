var Constants = require('../lib/constants');
var should = require('should');

var prodOriginal = Constants.API_BASE_PRODUCTION_URL;
var sandboxOriginal = Constants.API_BASE_SANDBOX_URL;

describe('Constants', function() {
    it('API_BASE_PRODUCTION_URL should be https://api.mastercard.com', function () {
        Constants.API_BASE_PRODUCTION_URL.should.equal("https://api.mastercard.com");
    });

    it('API_BASE_SANDBOX_URL should be https://sandbox.api.mastercard.com', function () {
        Constants.API_BASE_SANDBOX_URL.should.equal("https://sandbox.api.mastercard.com");
    });

    it('API_BASE_PRODUCTION_URL can be changed', function () {
        Constants.API_BASE_PRODUCTION_URL = "https://mock.com";
        Constants.API_BASE_PRODUCTION_URL.should.equal("https://mock.com");
    });

    it('API_BASE_SANDBOX_URL can be changed', function () {
        Constants.API_BASE_SANDBOX_URL = "https://mock.com";
        Constants.API_BASE_SANDBOX_URL.should.equal("https://mock.com");
    });

    after('cleanup constants', function() {
        (Constants.API_BASE_PRODUCTION_URL = prodOriginal).should.equal("https://api.mastercard.com");
        (Constants.API_BASE_SANDBOX_URL = sandboxOriginal).should.equal("https://sandbox.api.mastercard.com");
    });
});