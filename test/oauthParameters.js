var OAuthParameters = require('../lib/security/oauth/oauthParameters');
var should = require('should');
var oauth = new OAuthParameters("mockConsumerKey");

describe('OAuthParameters', function() {
    it('test new OAuthParameters', function () {
        oauth.consumerKey = "mockConsumerKey";
        oauth.timeStamp.should.be.a.String;
        oauth.nonce.should.be.a.String;
        oauth.signatureMethod.should.equal('RSA-SHA1');
        oauth.oauthVersion.should.equal('1.0');
        oauth.bodyHash.should.equal('');
        oauth.signature.should.equal('');
    });

    it('test nonce length and chars', function () {
        var nonce = oauth.nonce;

        // Test Length
        var length = OAuthParameters._testonly_.NONCE_LENGTH;
        nonce.length.should.equal(length);

        // Test Chars
        console.log("nonce: " + nonce);
        new RegExp("^[" + OAuthParameters._testonly_.VALID_CHARS + "]+$").test(nonce).should.equal(true);
    });

    it('multiple nonce should not collide', function () {
        // Generate 5 OAuthParameters
        var nonces = [];
        for(var i = 0; i < 5; i++) {
            nonces.push(new OAuthParameters("mockConsumerKey").nonce);
        }

        // Check no duplicates
        nonces.sort();

        for (var i = 0; i < nonces.length - 1; i++) {
            nonces[i + 1].should.not.equal(nonces[i]);
        }
    });

    it('test body hash', function () {
        oauth.generateBodyHash("abc");

        // http://approsto.com/sha-generator/
        oauth.bodyHash.should.equal("qZk+NkcGgWq6PiVxeFDCbJzQ2J0=");
    });

    it('test parameter hash', function () {
        var hashMap = {
            oauth_consumer_key: "mockConsumerKey",
            oauth_timestamp: oauth.timeStamp.toString(),
            oauth_nonce: oauth.nonce,
            oauth_signature_method: 'RSA-SHA1',
            oauth_version: '1.0',
            oauth_body_hash: "qZk+NkcGgWq6PiVxeFDCbJzQ2J0="
        };

        var ret = oauth.generateParametersHash("abc");

        hashMap.should.containDeep(ret);
    });

});