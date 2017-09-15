let OAuthParameters = {};

const NONCE_LENGTH = 8;
const VALID_CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

const crypto = require('crypto');

const _generateTimestamp =  () => Math.floor(new Date().getTime() / 1000);

const _generateNonce =  ()=> {
    let rnd = crypto.randomBytes(NONCE_LENGTH);
    let value = new Array(NONCE_LENGTH);
    const len = VALID_CHARS.length;

    for (let i = 0; i < NONCE_LENGTH; i++) {
        value[i] = VALID_CHARS[rnd[i] % len];
    }

    return value.join('');
};
/**
 *
 * @param consumerKey
 */
class clazz {
    constructor(consumerKey){
        this.consumerKey = consumerKey;
        this.timeStamp = _generateTimestamp();
        this.nonce = _generateNonce();
        this.signatureMethod = 'RSA-SHA256';
        this.oauthVersion = '1.0';
        this.bodyHash = null;
        this.signature = '';
    }
    generateBodyHash(body) {
        if (body) {
            let shaSum = crypto.createHash('sha256');
            shaSum.update(body, 'utf8');
            this.bodyHash = shaSum.digest('base64');
        }
    }
    generateParametersHash() {
        let ret = {
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
    }
    addParameter(key, value) {
        //todo
    };
}

OAuthParameters = clazz;

module.exports = OAuthParameters;

/**
 * Exposed for testing only
 */
OAuthParameters._testonly_ = {
    NONCE_LENGTH: NONCE_LENGTH,
    VALID_CHARS: VALID_CHARS
};