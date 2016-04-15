var MasterCardAPI = require('../index');
var Constants = require('../lib/constants');

// Imports for Test
var should = require('should');

describe('MasterCardAPI', function() {
    it('MasterCardAPI.API_BASE_PRODUCTION_URL should equal Constants.API_BASE_PRODUCTION_URL', function () {
        MasterCardAPI.API_BASE_PRODUCTION_URL.should.equal(Constants.API_BASE_PRODUCTION_URL)
    });

    it('MasterCardAPI.API_BASE_SANDBOX_URL should equal Constants.API_BASE_SANDBOX_URL', function () {
        MasterCardAPI.API_BASE_SANDBOX_URL.should.equal(Constants.API_BASE_SANDBOX_URL)
    });

    it('execute with no init returns error in callback', function(){
        MasterCardAPI.execute({}, function(error, success){
            should.not.exist(success);

            error.message.should.equal('MasterCardAPI.init(opts) must be called');
            should.not.exist(error.data);
        });
    });

    it('init with no authentication throws error', function(){
        (function() {
            MasterCardAPI.init({
                sandbox: true
            });
        }).should.throw('Authentication must be set');

        (function() {
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
       var replacedUri = MasterCardAPI.getUri("http://api.mastercard.com/masterpass/v{version}/user/{user_id}/moneysend","create", params);
       replacedUri.href.should.equal("http://api.mastercard.com/masterpass/v1/user/333/moneysend?Format=JSON");
       params.length.should.equal(0);
    });
    
    
    it('test _getUrl with three path parameter', function () {
       var params = new Array();
       params['version'] = "1";
       params['user_id'] = "333";
       params['other'] = "aaa";
       var replacedUri = MasterCardAPI.getUri("http://api.mastercard.com/masterpass/v{version}/user/{user_id}/{other}","create", params);
       replacedUri.href.should.equal("http://api.mastercard.com/masterpass/v1/user/333/aaa?Format=JSON");
       params.length.should.equal(0);
    });
    
    it('test _getRequestOptions with header parameter ', function () {
       var headerParam = new Array();
       headerParam['version'] = "1";
       headerParam['user_id'] = "333";
       headerParam['partner_id'] = "5465987412563";
       
       //httpMethod, uri, authHeader, headerParam
       var httpMethod = "GET";
       var uri = "http://api.mastercard.com/masterpass/v1/user/333/aaa?Format=JSON";
       var authHeader = "blablablablablabla";
       
       
       
       var returnObj = MasterCardAPI.getRequestOptions(httpMethod, uri, authHeader, headerParam);
       
       returnObj.headers['version'].should.equal("1")
       returnObj.headers['user_id'].should.equal("333")
       returnObj.headers['partner_id'].should.equal("5465987412563")
       
    });
    
    
    
    

});