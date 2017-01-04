var MasterCardAPI = require('../index');
var ResourceConfig = require('./resourceconfig');
var ResourceConfig2 = require('./resourceconfig');
var Constants = require('../lib/constants');
var OperationConfig = require('../lib/operation-config');
var OperationMetaData = require('../lib/operation-metadata');

// Imports for Test
var should = require('should');

describe('MasterCardAPI before init', function () {
    it('execute with no init returns error in callback', function () {
        MasterCardAPI.execute({}, function (error, success) {
            should.not.exist(success);

            error.message.should.equal('MasterCardAPI.init(opts) must be called');
            should.not.exist(error.data);
        });
    });

});


describe('MasterCardAPI check ResourceConfig singleton', function () {
    before(function () {
    });

    it('dafault', function () {
        ResourceConfig.getHost().should.equal("https://sandbox.api.mastercard.com");
        ResourceConfig.getHost().should.equal(ResourceConfig2.getHost());
        MasterCardAPI.getRegisteredResourceConfigCount().should.equal(1)

    });

    it('change it to PRODUCTION', function () {
        MasterCardAPI.setEnvironment(Constants.Environment.PRODUCTION)
        ResourceConfig.getHost().should.equal("https://api.mastercard.com");
        ResourceConfig.getHost().should.equal(ResourceConfig2.getHost());

    });

    it('change it to STAGE', function () {
        MasterCardAPI.setEnvironment(Constants.Environment.STAGE)
        ResourceConfig.getHost().should.equal("https://stage.api.mastercard.com");
        ResourceConfig.getHost().should.equal(ResourceConfig2.getHost());

    });

    it('change it to DEV', function () {
        MasterCardAPI.setEnvironment(Constants.Environment.DEV)
        ResourceConfig.getHost().should.equal("https://dev.api.mastercard.com");
        ResourceConfig.getHost().should.equal(ResourceConfig2.getHost());

    });

    it('change it to SANDBOX from sandbox:true', function () {
        MasterCardAPI.init({
            sandbox: true,
            authentication: {}
        });
        ResourceConfig.getHost().should.equal("https://sandbox.api.mastercard.com");
        ResourceConfig.getHost().should.equal(ResourceConfig2.getHost());
    });
});

describe('MasterCardAPI check environments', function () {
    before(function () {
        MasterCardAPI.getRegisteredResourceConfigCount().should.equal(1);
    });

    it('sandbox:true', function () {
        MasterCardAPI.getRegisteredResourceConfigCount().should.equal(1);
        MasterCardAPI.init({
            sandbox: true,
            authentication: {}
        });
        var replacedUri = MasterCardAPI.getUri([], new OperationConfig("/api/#env/user/333/moneysend", "create", [], []), new OperationMetaData("1.0.0", ResourceConfig.getHost(), ResourceConfig.getContext()));
        replacedUri.href.should.equal("https://sandbox.api.mastercard.com/api/user/333/moneysend?Format=JSON");
    });


    it('sandbox:false', function () {
        MasterCardAPI.getRegisteredResourceConfigCount().should.equal(1);
        MasterCardAPI.init({
            sandbox: false,
            authentication: {}
        });
        var replacedUri = MasterCardAPI.getUri([], new OperationConfig("/api/#env/user/333/moneysend", "create", [], []), new OperationMetaData("1.0.0", ResourceConfig.getHost(), ResourceConfig.getContext()));
        replacedUri.href.should.equal("https://api.mastercard.com/api/user/333/moneysend?Format=JSON");
    });




    it('environment=""', function () {
        MasterCardAPI.init({
            environment: "",
            authentication: {}
        });
        var replacedUri = MasterCardAPI.getUri([], new OperationConfig("/api/#env/user/333/moneysend", "create", [], []), new OperationMetaData("1.0.0", ResourceConfig.getHost(), ResourceConfig.getContext()));
        replacedUri.href.should.equal("https://sandbox.api.mastercard.com/api/user/333/moneysend?Format=JSON");
    });

    it('environment=stage', function () {
        MasterCardAPI.setEnvironment(Constants.Environment.STAGE);
        var replacedUri = MasterCardAPI.getUri([], new OperationConfig("/api/#env/user/333/moneysend", "create", [], []), new OperationMetaData("1.0.0", ResourceConfig.getHost(), ResourceConfig.getContext()));
        replacedUri.href.should.equal("https://stage.api.mastercard.com/api/user/333/moneysend?Format=JSON");
    });


    it('environment=mtf', function () {
        MasterCardAPI.setEnvironment(Constants.Environment.PRODUCTION_MTF);
        var replacedUri = MasterCardAPI.getUri([], new OperationConfig("/api/#env/user/333/moneysend", "create", [], []), new OperationMetaData("1.0.0", ResourceConfig.getHost(), ResourceConfig.getContext()));
        replacedUri.href.should.equal("https://api.mastercard.com/api/mtf/user/333/moneysend?Format=JSON");
    });

    it('environment=itf', function () {
        MasterCardAPI.setEnvironment(Constants.Environment.PRODUCTION_ITF);
        var replacedUri = MasterCardAPI.getUri([], new OperationConfig("/api/#env/user/333/moneysend", "create", [], []), new OperationMetaData("1.0.0", ResourceConfig.getHost(), ResourceConfig.getContext()));
        replacedUri.href.should.equal("https://api.mastercard.com/api/itf/user/333/moneysend?Format=JSON");
    });


    it('environment=production via init', function () {
        MasterCardAPI.init({
            environment: Constants.Environment.PRODUCTION,
            authentication: {}
        });
        var replacedUri = MasterCardAPI.getUri([], new OperationConfig("/api/#env/user/333/moneysend", "create", [], []), new OperationMetaData("1.0.0", ResourceConfig.getHost(), ResourceConfig.getContext()));
        replacedUri.href.should.equal("https://api.mastercard.com/api/user/333/moneysend?Format=JSON");
    });

    it('environment=sandbox via init', function () {
        MasterCardAPI.init({
            environment: Constants.Environment.SANDBOX,
            authentication: {}
        });
        var replacedUri = MasterCardAPI.getUri([], new OperationConfig("/api/#env/user/333/moneysend", "create", [], []), new OperationMetaData("1.0.0", ResourceConfig.getHost(), ResourceConfig.getContext()));
        replacedUri.href.should.equal("https://sandbox.api.mastercard.com/api/user/333/moneysend?Format=JSON");
    });



});

describe('MasterCardAPI', function () {
    before(function () {
        MasterCardAPI.init({
            sandbox: true,
            authentication: {}
        });

    });


    it('init with no authentication throws error', function () {
        (function () {
            MasterCardAPI.init({
                sandbox: true
            });
        }).should.throw('Authentication must be set');

        (function () {
            MasterCardAPI.init({
                sandbox: true,
                authentication: null
            });
        }).should.throw('Authentication must be set');
    });

    it('test _getUrl with two path parameter', function () {
        var params = new Array();
        params['version'] = "1";
        params['user_id'] = "333";
        var replacedUri = MasterCardAPI.getUri(params, new OperationConfig("/api/v{version}/user/{user_id}/moneysend", "create", [], []), new OperationMetaData("1.0.0", "https://sandbox.api.mastercard.com"));
        replacedUri.href.should.equal("https://sandbox.api.mastercard.com/api/v1/user/333/moneysend?Format=JSON");
        params.length.should.equal(0);
    });


    it('test _getUrl with three path parameter', function () {
        var params = new Array();
        params['version'] = "1";
        params['user_id'] = "333";
        params['other'] = "aaa";
        var replacedUri = MasterCardAPI.getUri(params, new OperationConfig("/api/v{version}/user/{user_id}/{other}", "create", [], []), new OperationMetaData("1.0.0", "https://sandbox.api.mastercard.com"));
        replacedUri.href.should.equal("https://sandbox.api.mastercard.com/api/v1/user/333/aaa?Format=JSON");
        params.length.should.equal(0);
    });

    it('test _getUrl with path parameter and query parameter', function () {
        var params = {
            user_id: "1",
            query_param: "query-param-value",
            body: "bodyValue"
        };
        var replacedUri = MasterCardAPI.getUri(params, new OperationConfig("/api/user/{user_id}", "create", ['query_param'], []), new OperationMetaData("1.0.0", "https://sandbox.api.mastercard.com"));
        replacedUri.href.should.equal("https://sandbox.api.mastercard.com/api/user/1?query_param=query-param-value&Format=JSON");
        should.exist(params.body);
        Object.keys(params).length.should.equal(1);
    });

    it('test _getUrl override host', function () {
        var params = {
            user_id: "1",
            query_param: "query-param-value",
            body: "bodyValue"
        };
        var replacedUri = MasterCardAPI.getUri(params, new OperationConfig("/api/user/{user_id}", "create", ['query_param'], []), new OperationMetaData("1.0.0", "http://localhost:8080"));
        replacedUri.href.should.equal("http://localhost:8080/api/user/1?query_param=query-param-value&Format=JSON");
        should.exist(params.body);
        Object.keys(params).length.should.equal(1);
    });

    it('test _getUrl production', function () {
        MasterCardAPI.init({
            sandbox: false, // set to production
            authentication: {}
        });

        var params = new Array();
        params['user_id'] = "333";
        var replacedUri = MasterCardAPI.getUri(params, new OperationConfig("/api/user/{user_id}", "create", [], []), new OperationMetaData("1.0.0", "https://api.mastercard.com"));
        replacedUri.href.should.equal("https://api.mastercard.com/api/user/333?Format=JSON");
        params.length.should.equal(0);
    });

    it('test _getRequestOptions with header parameter ', function () {
        var headerParam = new Array();
        headerParam['version'] = "1";
        headerParam['user_id'] = "333";
        headerParam['partner_id'] = "5465987412563";

        //httpMethod, uri, authHeader, headerParam
        var httpMethod = "GET";
        var uri = "/api/v1/user/333/aaa?Format=JSON";
        var authHeader = "blablablablablabla";

        var returnObj = MasterCardAPI.getRequestOptions(httpMethod, uri, authHeader, headerParam, new OperationMetaData("1.0.0", null));

        returnObj.headers['version'].should.equal("1");
        returnObj.headers['user_id'].should.equal("333");
        returnObj.headers['partner_id'].should.equal("5465987412563");

    });

});