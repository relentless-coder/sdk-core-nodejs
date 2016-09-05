var OAuthParameters = {};

var crypto = require('crypto');

/**
 *
 * @param consumerKey
 */
var clazz = function (consumerKey) {
    this.consumerKey = "abc";
    this.timeStamp = "123";
    this.nonce = "12345678";
    this.signatureMethod = 'RSA-SHA1';
    this.oauthVersion = '1.0';
    this.bodyHash = null;
    this.signature = '';

    this.generateBodyHash = function (body) {
        if (body) {
            var shaSum = crypto.createHash('sha1');
            shaSum.update(body, 'utf8');
            this.bodyHash = shaSum.digest('base64');
        }
    };

    this.generateParametersHash = function () {
        var ret = {
            oauth_consumer_key: this.consumerKey,
            oauth_timestamp: this.timeStamp.toString(),
            oauth_nonce: this.nonce,
            oauth_signature_method: this.signatureMethod,
            oauth_version: this.oauthVersion
        };

        if (this.bodyHash) {
            ret.oauth_body_hash = this.bodyHash;
        }

        return ret;
    };
}

OAuthParameters = clazz;

module.exports = OAuthParameters;