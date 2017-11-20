
/**
 *
 * @param version
 * @param host
 * @param environment
 * @param boolean jsonNative 
 */
var operationMetadata = function (version, host, context, jsonNative, contentTypeOverride) {
    this.version = version;
    this.host = host;
    this.context = context;
    if ( typeof jsonNative !== 'undefined' && jsonNative ) {
        this.jsonNative = jsonNative;
    } else{
        this.jsonNative = false;
    }
    if (typeof contentTypeOverride !== 'undefined' && contentTypeOverride) {
        this.contentTypeOverride = contentTypeOverride;
    } else {
        this.contentTypeOverride = null;
    }
};

module.exports = operationMetadata;