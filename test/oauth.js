// Imports for Test
var sinon = require('sinon');
var mockery = require('mockery');
var rewire = require('rewire');
var should = require('should');

var url = require('url');
var OAuth = rewire('../lib/security/oauth/oauth');

// variables for test
var consumerKey = "gVaoFbo86jmTfOB4NUyGKaAchVEU8ZVPalHQRLTxeaf750b6!414b543630362f426b4f6636415a5973656c33735661383d";
var p12Path = "./keystore/test_key.p12";
var alias = "test";
var password = "password";
var pem = "-----BEGIN RSA PRIVATE KEY-----\r\nMIIEogIBAAKCAQEAhPksO1kORNEtBGX1yTadY3WT/GFzIDFUU2p/FXRx4DniOvCx\r\nVyNxk66R/hKvWgy5v5GZAck6f5DKjF5WIdbs6ySRnxvIXVGV173V1RtHWmeoxwAP\r\nlLNFj1YM0RjBbMa7E1Kl2UM0KoW8qxomycWswkUpS/dqekdCT6j+/xAnY+9J5naP\r\nujOwekuK0pGXryFpusXGjMMfHKQWYSQs2IOC4M/0oX8Y2UIICR6Jli3Qt2s6Zbhq\r\nI5jxrFJ9djaS6CqTq6C+YOtS5N+FdGvkR/b0WlJk0HWHqOT+dkOnikVGRglwfAwY\r\nFNLmICHY52Lt02jq74aeCCdw4f1nzVBAAXrwOQIDAQABAoIBABY3HsmnfjfHDpNO\r\niXqdUjwcl6Wxji9RrnnlL+ggtSm14fLg5W/ebwoyPxfIfV05BQtZQsvGl6xaP0ym\r\nMhOjOZ+rU1zWomncyIDrqT7aONiEuvDMNM4uCTACO0/vp9kJdpWq2CRtEtkL0NJx\r\nIwvQp6UpMtYLNtHI9+4hGMD6LOqIAI91PgA6htfAYG3zww4eEsQhoXez/TtFPEM/\r\nVDSZdxcH9aLYmKv6Mavo164WanzPyNZrwGlnG/NSG+rDpYl4W83u+hHXkOroVcqV\r\nC4Z+BsgFpNEY7nO5GAOV/lWsvSmwKxVk44rofQWCyQQ98DZEq/haiAZm7sN9hiYl\r\nAIsxxsUCgYEA0iryRaQ057xWTYKCl7yMrFc0fzP3o5UDARhf0fk4Yevl6jWt6HyN\r\nqYkGdoGdHCL/Vj6Mtx8MYdlOAXuc/dDCZyk41iY71dqVB8Fd36Y1o0joPaXR4ziV\r\nY0AiCslVDVt87uxg/0wWVioY9X3Nv0h/BxK5wdeFKJkNDkwi421bN5cCgYEAofiv\r\nuIcB3mjqaOktWSw8Yp5cnEJikqvJ9tqmxGqVIySWUhbAS65mwIL7NVvUJYFcBg0E\r\nTlXDT+niA9OEUmfdJKt93KjppJcKGz5RDJ2akVd0X9M5GuVGJKE9dgrSLm51G19d\r\nE1FUEt8+HWWh4/myNst2jS/LDiBLtUiFbBldkK8CgYBWPfNO6pQfJ+TOR6jpNSEQ\r\ns3RCYoPTJ5mlAGiJlFgzroaZNk/X4AyNrkHtrUBYRHA85sv9dQsyt+ZPq3b/nIO5\r\nq2u8TNIu7lRLa2jnFqBaEdfjPEFFmXmL0cxmWrnBEnLQ5ETlXkaoMvws+OPOA6TE\r\ntUVuqs7kmvGFlW6Xns9YnwKBgBJBDrzDKmjAdjqgnOXB4IRUyKcrrCRPjBFwDv9v\r\n66LsSqyxt7ZPz3C+0kTvNneLnq1n5iZV8A8fksNPoUgQQJITabnmp35PL2pmmYfM\r\nc1ESBCGQkoz/bepO6bhV+94TwMr28mxs7Aa8diml/JrO11DpmVDMJBxRc3bY14CZ\r\nUzwtAoGAVU80f83PFH76mr2Xdoha+U9UvuBKqdRhz3Fl7JmCVhse1BF+gmcxGIbe\r\nRRy8lkDz73CP7rt0jTqdbnUr5R4w2m9jIc+fUiYb4GaxhGnmrPrhqa0o2l1ZTqI7\r\nFs9YxwNcEkIqtaJV05bry8D8avAz4iwskYUkxt5FOpB1dboHLcM=\r\n-----END RSA PRIVATE KEY-----\r\n";

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
        oauth.privateKey.should.equal(pem);
    });

    it('sign', function() {
        var uri = url.parse("https://sandbox.mastercard.com/api/mock?Format=JSON");
        var httpMethod = "POST";
        var body = JSON.stringify({a: "a", b: 1, c: true});

        var oauth = new OAuth(consumerKey, p12Path, alias, password);

        // Mocking

        // given
        var userServiceMock = require("./mock/mockOAuthParameters");

        OAuth.__set__({
            'OAuthParameters': userServiceMock
        });
        // Mocking

        var signature = oauth.sign(uri, httpMethod, body);

        signature.should.equal("OAuth oauth_body_hash=\"udgDg+hDUuKNSliLHbL1PeZLCWo=\",oauth_consumer_key=\"abc\",oauth_nonce=\"12345678\",oauth_signature=\"V1YW5Oeed6h0KbIcQTQ6%2FeIeTY3LBMWXlQGvWTRkwivmOuS7NRn5rfortejLLwaHXdVvkbSaYQTBCFcmBJxj3gd1YRy62UJNT%2B%2FaoVEut67gHXWlyrfI%2B%2BH5%2BSrpDBWo3dGHdGXEQalRJ1pVrexfsa5S0fF0DHiX1FHFm2auMhgQp89Ck3BKgBBNQb4ICl4kc0tEdR%2F40CojgREWwVFnwqUba1gS6wmX40Yytyuj4Ctou3Szg9PUHbPyyDK7RfYEaQt38gBP4soY3%2BINjNj2PNJw8BhxtcRhu9bOoy3ctWmS07PkTDXMStVLQKPXdnp%2FbAhFIEAbDTCtXwxveRoZyQ%3D%3D\",oauth_signature_method=\"RSA-SHA1\",oauth_timestamp=\"123\",oauth_version=\"1.0\"");
    });

});