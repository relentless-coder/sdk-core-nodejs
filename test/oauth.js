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

    it('sign POST', function() {
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

        signature.should.equal("OAuth oauth_body_hash=\"udgDg+hDUuKNSliLHbL1PeZLCWo=\",oauth_consumer_key=\"abc\",oauth_nonce=\"12345678\",oauth_signature=\"dBUpv1WZ1o6TPfJK4EgS5UTfRbgozYivLu%2BbgX0I29yH7os04WlZiyf4gfzD4HrLclsSSkra%2FROS6OGP6PsuQkzkxg17Ib7lAJTOzKzUj3KQQA5fcxEjl9KJO55OPX9hkr%2BY65N6Q9QWcXDo5OVQunBW8DERxLxgxjwf6OZ%2BoRPf35UunmhZOK8Siy8E7bkS1JzO79TVFCI7NEMlqZLPGXCb7i72HRBrqMrTfQBhO8Hiql4yn%2FjSKmDzuaKkS8sGlQizc52NBUKcW1rY7I8sKzEBlNpqLYlhq6t1s%2Bu9qPvn2p5sFKaQCnBVogc1ijMeikyINOCPlIGsjeuIpMjodg%3D%3D\",oauth_signature_method=\"RSA-SHA1\",oauth_timestamp=\"123\",oauth_version=\"1.0\"");
    });
    
    
    it('sign GET', function() {
        var uri = url.parse("https://sandbox.mastercard.com/api/mock?Format=JSON");
        var httpMethod = "GET";
        var body = null;

        var oauth = new OAuth(consumerKey, p12Path, alias, password);

        // Mocking

        // given
        var userServiceMock = require("./mock/mock-oauth-parameters");

        OAuth.__set__({
            'OAuthParameters': userServiceMock
        });
        // Mocking

        var signature = oauth.sign(uri, httpMethod, body);

        signature.should.equal("OAuth oauth_consumer_key=\"abc\",oauth_nonce=\"12345678\",oauth_signature=\"p7PVg6JAdI6OKYp0%2FMU4NhRKeJutJ%2Fjtc36FBvhScHsIcWgT4gbBP6QJAGysM0oXmeEf7NdXHY775ja47xIZpASSXcBIahPK2HpE7eGlfle8KbDPDnPSWW795gRSgIk05TRC0PS%2FCn%2FsFgl5EeQblICCtDkHlJbhvwOsQPsOcuKAd96wpDur65eHbDlTUK0MXcTalW%2FqDxtJHM4quvXPKEIqviUGC2fVeLtOYW82S7dG47vqVrZpiK7FG8Z0bSLy8%2BPW76UJvQz%2Fmu8XhUDOI1elvRZFYCPnS8CZGtAUhS57WxXhh%2BPHx0mQkIvIHWssRICtK0YzafyquF8kRp%2FP2A%3D%3D\",oauth_signature_method=\"RSA-SHA1\",oauth_timestamp=\"123\",oauth_version=\"1.0\"");
    });

});