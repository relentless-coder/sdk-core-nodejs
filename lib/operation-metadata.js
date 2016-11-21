/**
 *
 * @param version
 * @param host
 * @param environment
 */
var operationMetadata = function (version, host, environment) {
    this.version = version;
    this.host = host;
    this.environment = environment;
};

module.exports = operationMetadata;