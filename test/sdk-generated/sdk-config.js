var pkgJson = require('../../package.json');

var sdkConfig = {};

var _host = "http://localhost:8081";
var _version = pkgJson.version;

/**
 * Get the SDK version
 * @returns {*}
 */
sdkConfig.getVersion = function() {
    return _version;
};

/**
 * Set the host for this SDK
 *
 * @param host
 */
sdkConfig.setHost = function(host) {
    _host = host
};

/**
 *
 * @returns {*}
 */
sdkConfig.getHost = function() {
    return _host;
};

module.exports = sdkConfig;