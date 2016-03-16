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

});