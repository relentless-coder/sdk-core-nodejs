// Imports for Test
var sinon = require('sinon');
var mockery = require('mockery');
var rewire = require('rewire');
var should = require('should');

var url = require('url');
var OAuth = rewire('../lib/security/oauth/oauth');

// variables for test
var consumerKey = "L5BsiPgaF-O3qA36znUATgQXwJB6MRoMSdhjd7wt50c97279!50596e52466e3966546d434b7354584c4975693238513d3d";
var p12Path = "./keystore/mcapi_sandbox_key.p12";
var alias = "test";
var password = "password";
    
describe('OAuth', function() {
    var requestStub

    before(function(){
        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false,
            useCleanCache: true
        });
    });

    after(function(){
        mockery.disable();
    });

    it('consumer key not set throws error', function(){
        (function() {
            new OAuth("", p12Path, alias, password); }
        ).should.throw('Consumer key is not set');
    });

    it('p12 path not set throws error', function(){
        (function() {
            new OAuth(consumerKey, "", alias, password); }
        ).should.throw('Path to .p12 file is not set');
    });

    it('key alias not set throws error', function(){
        (function() {
            new OAuth(consumerKey, p12Path, "", password); }
        ).should.throw('Key alias is not set');
    });

    it('wrong key alias throws error', function(){
        (function() {
            new OAuth(consumerKey, p12Path, "doesnt_exist", password); }
        ).should.throw("No key found for alias [doesnt_exist]");
    });

    it('keystore password not set throws error', function(){
        (function() {
            new OAuth(consumerKey, p12Path, alias, ""); }
        ).should.throw('Keystore password is not set');
    });

    it('wrong password throws error', function(){
        (function() {
            new OAuth(consumerKey, p12Path, alias, "invalid")
        }).should.throw('PKCS#12 MAC could not be verified. Invalid password?');
    });

    it('can load key', function(){
        var oauth = new OAuth(consumerKey, p12Path, alias, password);
        oauth.consumerKey.should.equal(consumerKey);
    });

    it('sign', function() {
        var uri = url.parse("https://sandbox.mastercard.com/api/mock?Format=JSON");
        var httpMethod = "POST";
        var body = JSON.stringify({a: "a", b: 1, c: true});

        var oauth = new OAuth(consumerKey, p12Path, alias, password);

        // Mocking

        // given
        var userServiceMock = require("./mock/mock-oauth-parameters");

        OAuth.__set__({
            'OAuthParameters': userServiceMock
        });
        // Mocking

        var signature = oauth.sign(uri, httpMethod, body);

        signature.should.equal("OAuth oauth_body_hash=\"udgDg+hDUuKNSliLHbL1PeZLCWo=\",oauth_consumer_key=\"abc\",oauth_nonce=\"12345678\",oauth_signature=\"LXvUWLRRjRutfUFMWeIvOKmyoX4TGEK4vqw1XUy7Kt%2BedPqm2jPM3qKvZEhH2e8FH1JPkK7g%2BrSkKV08wHTkxokVCfmL0I6xYysJpGsm8RaeNIMt9p%2BSZyp77Nrp5l0ZuzHz2VJ%2FdLjN2nERJOqrVumPHXTJg5sfis8eptEIMJptN23Shz2T9hBfFoW357lMLe9NVXpEKfxpJFVRwTzCzSqWijJ285hBwqo8%2B2lh7lK3uN4FcpRlp1sOmZ4dFuNLEi52RoP6qRFuDgvoZDTG2QOWfgztmIMm%2F%2Bu3ZhmNKmhSVkbBnrf2DYu%2B8QQWHLwi1RwrDVwC8wsoo164ncs3TA%3D%3D\",oauth_signature_method=\"RSA-SHA1\",oauth_timestamp=\"123\",oauth_version=\"1.0\"");
    });

});