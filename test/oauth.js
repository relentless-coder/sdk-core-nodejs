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

        signature.should.equal("OAuth oauth_body_hash=\"udgDg+hDUuKNSliLHbL1PeZLCWo=\",oauth_consumer_key=\"abc\",oauth_nonce=\"12345678\",oauth_signature=\"OCoSeQRoWOJ5usZXvFEj06EULeVmFjootIS%2FAK3ALRauSJKP0GVofDFC7TvwnEEDc%2BlHpR5y5GFQulZoxfXO%2B3AJakoEbb2dGKQRWwSeYqmZ6B61oVx5y7m66RNDmN8SZPFAd55zhEBbCG55kejsBwTCmA6tN%2FhJu7hvEbcES8cnN0UICfkyEwe0y9JDGn8fNypA0keDbJPnxaAxl728Y6kDjJdNnX3vih28%2BhuhCeH6MYCdfLoNNWziLO6PH6pmAQ7KKrNtw5gTI7TRLpm3vScr1Qdx%2FPam4Zdur%2Bgjc6NFC7Ni2RU1MxicfRWS1BvuSkCMEsP%2Bnz7ZnSKx9Kgirw%3D%3D\",oauth_signature_method=\"RSA-SHA1\",oauth_timestamp=\"123\",oauth_version=\"1.0\"");
    });

});