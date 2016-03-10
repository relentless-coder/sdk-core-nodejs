var fs = require('fs');
var crypto = require('crypto');
var URL = require('url');
var queryString = require('querystring');

var OAuthParameters = require('./oauthParameters');

function OAuth(consumerKey, p12Path) {
    this.consumerKey = consumerKey;
    this.privateKey = _getPrivateKey(p12Path);

    /**
     * Sign the HTTP Request and return OAuth header value
     * @param uri
     * @param httpMethod
     * @param body
     * @returns {*} OAuth header value
     */
    this.sign = function (uri, httpMethod, body) {
        var oauthParams = new OAuthParameters(this.consumerKey);
        oauthParams.generateBodyHash(body);

        var signatureBaseString = _generateSignatureBaseString(uri.href, httpMethod, oauthParams);
        signatureBaseString = _postProcessSignatureBaseString(signatureBaseString);

        return _signRequest(oauthParams, this.privateKey, signatureBaseString)
    };
}

/**
 * Read the private key from the supplied p12 file
 *
 * @param p12Path
 * @returns {*} PEM String in UTF-8
 * @private
 */
var _getPrivateKey = function (p12Path) {
    var pem = fs.readFileSync(p12Path);
    return pem.toString('utf8')
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
var _generateSignatureBaseString = function (url, requestMethod, oauthParams) {
    return encodeURIComponent(requestMethod.toUpperCase()) +
        '&' +
        encodeURIComponent((_normalizeUrl(url))) +
        '&' +
        encodeURIComponent(_normalizeParameters(url, oauthParams));
};

/**
 * "private" method to sign the signature base string
 *
 * @param oauthParams - parameters containing authorization information
 * @param privateKey - URSA private key object
 * @param oauthParams
 * @param privateKey
 * @param signatureBaseString
 * @returns {*} authHeader
 * @private
 */
var _signRequest = function (oauthParams, privateKey, signatureBaseString) {
    var signer = crypto.createSign('RSA-SHA1');
    signer = signer.update(new Buffer(signatureBaseString));

    oauthParams.signature = signer.sign(privateKey, 'base64');
    oauthParams.signature = encodeURIComponent(oauthParams.signature);
    oauthParams.signature = oauthParams.signature.replace('+', '%20');
    oauthParams.signature = oauthParams.signature.replace('*', '%2A');
    oauthParams.signature = oauthParams.signature.replace('~', '%7E');

    return _buildAuthHeaderString(oauthParams);
};

/**
 * "private" method to build the authorization header from the contents of the oauth parameters
 *
 * @param oauthParams - object containing authorization information
 * @returns {string} - authorization header
 * @private
 */
var _buildAuthHeaderString = function (oauthParams) {
    var header = '';
    header = header + 'oauth_consumer_key' + '="' + oauthParams.consumerKey + '",';
    header = header + 'oauth_nonce' + '="' + oauthParams.nonce + '",';
    header = header + 'oauth_signature' + '="' + oauthParams.signature + '",';
    header = header + 'oauth_signature_method' + '="' + oauthParams.signatureMethod + '",';
    header = header + 'oauth_timestamp' + '="' + oauthParams.timeStamp + '",';
    header = header + 'oauth_version' + '="' + oauthParams.oauthVersion + '"';

    if (oauthParams.bodyHash) {
        header = 'OAuth ' + 'oauth_body_hash'
            + '="' + oauthParams.bodyHash + '",' + header;
    }
    else {
        header = 'OAuth ' + header;
    }

    return header;
};


/**
 * "private" method to strip off the querystring parameters and port from the URL
 *
 * @param url - url to modify
 * @returns {*} - normalized URL
 * @private
 */
var _normalizeUrl = function (url) {
    var tmp = url;

    // strip query portion
    var idx = url.indexOf('?');
    if (idx) {
        tmp = url.substr(0, idx);
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
var _normalizeParameters = function (url, oauthParams) {
    var uri = URL.parse(url);

    var qstringHash = queryString.parse(uri.search.split('?')[1]);
    var oauthHash = oauthParams.generateParametersHash();

    var nameArr = [];
    var idx = 0;

    for (var qStringKey in qstringHash) {
        nameArr[idx] = qStringKey;
        idx++;
    }

    for (var oauthKey in oauthHash) {
        nameArr[idx] = oauthKey;
        idx++;
    }

    nameArr.sort(); // now params are in alphabetical order

    var parm = '';
    var delim = '';

    for (var i = 0; i < nameArr.length; i++) {
        if (qstringHash[nameArr[i]]) {
            parm = parm + delim + nameArr[i] + '=' + qstringHash[nameArr[i]];
        }
        else {
            parm = parm + delim + nameArr[i] + '=' + oauthHash[nameArr[i]];
        }
        delim = '&';
    }

    return parm;
};

/**
 *
 * @param signatureBaseString
 * @returns {*}
 * @private
 */
var _postProcessSignatureBaseString = function (signatureBaseString) {
    signatureBaseString = signatureBaseString.replace(/%20/g, '%2520');
    signatureBaseString = signatureBaseString.replace('!', '%21');
    return signatureBaseString
};

module.exports = OAuth;