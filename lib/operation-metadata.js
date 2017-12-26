class operationMetadata {
    constructor(version, host, context, jsonNative) {
        this.version = version;
        this.host = host;
        this.context = context;
        if (typeof jsonNative !== 'undefined' && jsonNative) {
            this.jsonNative = jsonNative;
        } else {
            this.jsonNative = false;
        }
    }
}

module.exports = operationMetadata;
