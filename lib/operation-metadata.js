/**
 *
 * @param version
 * @param host
 */
var operationConfig = function (version, host) {
    this.version = version;
    this.host = host;
    this.environment = null;
};


/**
 *
 * @param version
 * @param host
 * @param environment
 */
var operationConfig = function (version, host, environment) {
    this.version = version;
    this.host = host;
    this.environment = environment;
};

module.exports = operationConfig;