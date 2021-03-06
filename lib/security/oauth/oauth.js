const fs = require('fs');
const crypto = require('crypto');
const URL = require('url');
const queryString = require('querystring');
const forge = require('node-forge');
const utils = require('../../utils');
const error = require('../../error');

const OAuthParameters = require('./oauth-parameters');

const _uriRfc3986Encode = (input) => {
    let str = (input + '');

    // Tilde should be allowed unescaped in future versions of PHP (as reflected below),
    // but if you want to reflect current
    // PHP behavior, you would need to add ".replace(/~/g, '%7E');" to the following.
    return encodeURIComponent(str)
        .replace(/!/g, '%21')
        .replace(/'/g, '%27')
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29')
        .replace(/\*/g, '%2A');
};

/**
 * "private" method to strip off the querystring parameters and port from the URL
 *
 * @param url - url to modify
 * @returns {*} - normalized URL
 * @private
 */
const _normalizeUrl = (url) => {
    let tmp = url;

    // strip query portion
    let idx = url.indexOf('?');
    if (idx > 0) {
        tmp = url.substr(0, idx);
    } else {
        tmp = url
    }

    // strip port
    if (tmp.lastIndexOf(':') && tmp.lastIndexOf(':') > 5) {
        // implies port is given
        tmp = tmp.substr(0, tmp.lastIndexOf(':'));
    }

    return tmp;
};

/**
 * "private" method to put querystring and oauth parameters in lexical order
 *
 * @param url - url containing query string parameters
 * @param oauthParams - object containing authorization info
 * @returns {string} - normalized parameter string
 * @private
 */
const _normalizeParameters = (url, oauthParams) => {
    let uri = URL.parse(url);

    // Always has at least ?Format=JSON
    let qstringHash = uri.search ? queryString.parse(uri.search.split('?')[1]) : [];
    let oauthHash = oauthParams.generateParametersHash();

    let nameArr = [];
    let idx = 0;

    for (let qStringKey in qstringHash) {
        nameArr[idx] = qStringKey;
        idx++;
    }

    for (let oauthKey in oauthHash) {
        nameArr[idx] = oauthKey;
        idx++;
    }

    nameArr.sort(); // now params are in alphabetical order

    let parm = '';

    for (let i = 0; i < nameArr.length; i++) {


        if (i > 0) {
            parm += '&';
        }

        if (qstringHash[nameArr[i]]) {
            parm += `${_uriRfc3986Encode(nameArr[i])}=${_uriRfc3986Encode(qstringHash[nameArr[i]])}`;
        }
        else {
            parm += `${_uriRfc3986Encode(nameArr[i])}=${_uriRfc3986Encode(oauthHash[nameArr[i]])}`;
        }
    }
    return parm;
};

/**
 * "private method" to generate the signature base string from the URL, request method, and parameters
 *
 * @param url - URL to connect to
 * @param requestMethod - HTTP request method
 * @param oauthParams - parameters containing authorization information
 * @returns {string|*} - signature base string generated
 * @private
 */
const _generateSignatureBaseString = function (url, requestMethod, oauthParams) {
    return `${_uriRfc3986Encode(requestMethod.toUpperCase())}&${_uriRfc3986Encode((_normalizeUrl(url)))}&${_uriRfc3986Encode(_normalizeParameters(url, oauthParams))}`;
};

/**
 *
 * @param signatureBaseString
 * @returns {*}
 * @private
 */
const _postProcessSignatureBaseString = (signatureBaseString) => {
    signatureBaseString = signatureBaseString.replace(/%20/g, '%2520');
    signatureBaseString = signatureBaseString.replace('!', '%21');
    return signatureBaseString
};

/**
 * "private" method to build the authorization header from the contents of the oauth parameters
 *
 * @param oauthParams - object containing authorization information
 * @returns {string} - authorization header
 * @private
 */
const _buildAuthHeaderString = ({ consumerKey, nonce, signature, signatureMethod, timeStamp, oauthVersion, bodyHash }) => {

    let header = `oauth_consumer_key="${consumerKey}",oauth_nonce="${nonce}",oauth_signature="${signature}",oauth_signature_method="${signatureMethod}",oauth_timestamp="${timeStamp}",oauth_version="${oauthVersion}"`;

    if (bodyHash) {
        header = `OAuth oauth_body_hash="${bodyHash}",${header}`;
    }
    else {
        header = `OAuth ${header}`;
    }

    return header;
};

/**
 * Read the private key from the supplied p12 file
 *
 * @param p12Path
 * @param alias
 * @param password
 * @returns {*} PEM
 * @private
 */
const _getPrivateKey = (p12Path, alias, password) => {
    // 1) Read p12 file
    let p12File = fs.readFileSync(p12Path, 'binary');

    // Get asn1 from DER
    let p12Asn1 = forge.asn1.fromDer(p12File, false);

    // Get p12 using the password
    let p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, false, password);

    // Get Key from p12
    let keyObj = p12.getBags({
        friendlyName: alias,
        bagType: forge.pki.oids.pkcs8ShroudedKeyBag
    }).friendlyName[0];

    if (!utils.isSet(keyObj)) {
        throw new error.SDKError("No key found for alias [" + alias + "]")
    }

    let key = keyObj.key;

    // Get private key as PEM
    let pem = forge.pki.privateKeyToPem(key);

    return pem;
};

/**
 * "private" method to sign the signature base string
 *
 * @param oauthParams - parameters containing authorization information
 * @param privateKey - URSA private key object
 * @param signatureBaseString
 * @returns {*} authHeader
 * @private
 */
const _signRequest = (oauthParams, privateKey, signatureBaseString) => {
    let signer = crypto.createSign('RSA-SHA256');
    signer = signer.update(new Buffer(signatureBaseString));

    oauthParams.signature = signer.sign(privateKey, 'base64');
    oauthParams.signature = _uriRfc3986Encode(oauthParams.signature);
    oauthParams.signature = oauthParams.signature.replace('+', '%20');
    oauthParams.signature = oauthParams.signature.replace('*', '%2A');
    oauthParams.signature = oauthParams.signature.replace('~', '%7E');

    return _buildAuthHeaderString(oauthParams);
};

/**
 * Create an OAuth security object for sending API requests
 *
 * @param consumerKey - consumer key from MasterCard Developer Zone
 * @param p12Content - string content of p12 key store
 * @param alias - key alias for p12 key
 * @param password - password for p12 key
 * @constructor
 */

 class OAuthWithFileContent {
   constructor(consumerKey, p12Content, alias, password) {
     if(!utils.isSet(consumerKey)) {
         throw new error.SDKError('Consumer key is not set');
     }

     if(!p12Content || p12Content.length <= 1) {
         throw new error.SDKError('p12 key store content is empty');
     }

     if(!utils.isSet(alias)) {
         throw new error.SDKError('Key alias is not set');
     }

     if(!utils.isSet(password)) {
         throw new error.SDKError('Keystore password is not set');
     }

     this.consumerKey = consumerKey;
     this.privateKey = _getPrivateKey(p12Content, alias, password);
   }
   sign(uri, httpMethod, body){
           let oauthParams = new OAuthParameters(this.consumerKey);
           oauthParams.generateBodyHash(body);

           let signatureBaseString = _generateSignatureBaseString(uri.href, httpMethod, oauthParams);
           signatureBaseString = _postProcessSignatureBaseString(signatureBaseString);

           return _signRequest(oauthParams, this.privateKey, signatureBaseString)
       }
 }

/**
 * Create an OAuth security object for sending API requests
 *
 * @param consumerKey - consumer key from MasterCard Developer Zone
 * @param p12Path - path to .p12 file
 * @param alias - key alias for p12 key
 * @param password - password for p12 key
 * @constructor
 */
class OAuth {
    constructor(consumerKey, p12Path, alias, password) {
        if (!utils.isSet(consumerKey)) {
            throw new error.SDKError('Consumer key is not set');
        }

        if (!utils.isSet(p12Path)) {
            throw new error.SDKError('Path to .p12 file is not set');
        }

        if (!utils.isSet(alias)) {
            throw new error.SDKError('Key alias is not set');
        }

        if (!utils.isSet(password)) {
            throw new error.SDKError('Keystore password is not set');
        }

        this.consumerKey = consumerKey;
        this.privateKey = _getPrivateKey(p12Path, alias, password);

    }
    sign(uri, httpMethod, body) {
            let oauthParams = new OAuthParameters(this.consumerKey);
            oauthParams.generateBodyHash(body);

            let signatureBaseString = _generateSignatureBaseString(uri.href, httpMethod, oauthParams);
            signatureBaseString = _postProcessSignatureBaseString(signatureBaseString);

            return _signRequest(oauthParams, this.privateKey, signatureBaseString)
        }

}

module.exports = {
    OAuth: OAuth,
    OAuthWithFileContent: OAuthWithFileContent
};
