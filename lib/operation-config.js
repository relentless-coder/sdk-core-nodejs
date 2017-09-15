class operationConfig {
    constructor(path, action, queryParams, headerParams) {
        this.path = path;
        this.action = action;
        this.queryParams = queryParams;
        this.headerParams = headerParams;
    }
}

module.exports = operationConfig;