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
var pem = "-----BEGIN RSA PRIVATE KEY-----\r\nMIIEogIBAAKCAQEA1R3UNKrcISZajzt5f1yuynjxwlXJlRpxErKRaDFz1qjBmeDW\r\nQtWumYlN/QetddwEVghL3TVfwFWhW1kUjNtLitEBO9afqvU5j+WZapo7SKBDOABO\r\ntPK/5FmvzMkWoG8KsvQxXTZLFCI8FhFT5j8txF/30ROPijBgUCLMqHb6tPAyV5fS\r\n6F/At8+GeIhOAFgE0n74iaLUTyyBGj+24gk0/Xi407eLptiIjcOgJfhfNky4fMRQ\r\nWVCLtjLS8QHn8KB3f3wQFOe8hqe91N0osjcWvyh9FKvLLfiRTNevmjUs6h8B/Jzr\r\n1cZ+b/cBQCjiyY0A0S96FhB1DsQvgHVy0wZ7VwIDAQABAoIBACsBdvYd2IgT/khT\r\nHyR1ZoxTNa4as7AUAudcA328JP0XVuIfff1Es5QmIgfCid1zxag6ylxcTfM5FHOj\r\nmUMHacocfRw/Jj9Qdwozse7SKs5wEMB3R2q6ZcDF3HT9y0QaxFTydBe0QhhRBEEL\r\nxBt9elXba93UDa48LuNc8mG4iMUEKUsCIc8WYKCuXub/4ARU3eElfYmnid1UC25B\r\nFlWRlPynN/CMa+GKWgonYSWSD9wnh8IeKbtUBafQVbOWUn3kF34JgjU6b3qxRRz9\r\nEqjX9BfW/yT2bVd/nkW1qikZyDHs/XLAHNdGI0UUjTeQPqSY6AClALcl9iC0+QYr\r\nzpuR3yECgYEA7g3JlfaWBgOsXYG8rtnLqW4GUk3grrUHMDqVVuM2zmL6O3aYO9LI\r\nRFWpqAjJ2X+H0cI/czrhxnONqyqOO0KtBu/yBnVQdKZncmmZ5gBWv4GQKZvFO+J8\r\nKDEvACO3piqlZlRHARPrQZaCw7XrKh4zsL1yzZZq7EA9E5lx/ulkPbECgYEA5S7G\r\nThwyObSkApc7mmxkPqCWfCrRvSIrziXxGFdnA+VsEcfQCRQI6zlVCrKsh6U+RepG\r\nYaEZXdZrNYU3pWWj5KnEr3ZY9LvnLW34GmAPhASa/2eGrWCk7gczErZP+RPjdztw\r\nqEbhSTbqGeG1K886BROLF8YTHFDM4LlzIRNW44cCgYBS30vhQAHEQD0eJE8qU7nZ\r\n1uqudlwUlgLVoF9i6yCmQsC4OLYQhXWgjG3OiJi0dfgzZrsuAz6cFpgoEV2IddLE\r\nin2oD+kdYty6cNbZwh5w9srYIVlNWrA8Ubr6AnUpjMkd0ZMSZfvNTndhaJBgjjkS\r\nezFfLtE0Q7y/ePi9dESoUQKBgFXvahBT5klZAL6v8nt+9T++e27np2mh7IcKFxMn\r\ngsslNZadM9aTmpyJDOhMAwGB5o3UwLtO6vISunSBFVKBgCj3t3aLi+OIqbCRMZzC\r\nNE8uYugt64QLXwyZyn7Tub0NxhcpRJ70pPkNDE7UIVjiBUFuCJPLg9L0QT5qi071\r\nr3j1AoGAYvy3LRkEj+JVi6woP4lFJ3FCsLdPt3Ug7L67zhyYmwdysbxUdhje1H2R\r\n6oJAuneLa8mZuj5WYc6V4qG/dHi5kqw7+KV+S9ouD9TV25qIjT3Gofhldg2UhgvU\r\nLkYSAezJocJ14QuLXj7VvtzkvTcPBYaf9ER4tvgMhYwKoCFNltE=\r\n-----END RSA PRIVATE KEY-----\r\n";

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
        var userServiceMock = require("./mock/mock-oauth-parameters");

        OAuth.__set__({
            'OAuthParameters': userServiceMock
        });
        // Mocking

        var signature = oauth.sign(uri, httpMethod, body);

        signature.should.equal("OAuth oauth_body_hash=\"udgDg+hDUuKNSliLHbL1PeZLCWo=\",oauth_consumer_key=\"abc\",oauth_nonce=\"12345678\",oauth_signature=\"xvT6HcX%2BGDcY7o0r0rKIKusYPrSPWbCvEULJ4F%2FaFRoP%2BMpt6RCyFfYriTeV5Wsnl%2Ftrv13NMfj%2BofMXPISZO1bUNquggSK%2FfqPxkl0TciQNbNRiFZDXjkyFgWqX0CTULThpNgzbVdZlrBeivF%2BzIJkwVf9WorBbxTyReQP4lwSFmdJLga37zEIBxh6ed2fw8FKOZK2q4C9BjQ%2F0TkIkrvRzwuWLos9gfvcdVBPJnOiYU5ONmbJMgjjkua367zL2U4fAyKDuORKEhg7vmhIuhJsywzDJT%2FQLQSp5TQ%2BH2unNqpEIlX3xnAAwt0X4vT58z0g9HUAtq66tV4QXqey0Rg%3D%3D\",oauth_signature_method=\"RSA-SHA1\",oauth_timestamp=\"123\",oauth_version=\"1.0\"");
    });

});