var MasterCardAPI = require('../index');
var Constants = require('../lib/constants');
var should = require('should');

describe('MasterCardAPI', function() {
    it('MasterCardAPI.API_BASE_PRODUCTION_URL should equal Constants.API_BASE_PRODUCTION_URL', function () {
        MasterCardAPI.API_BASE_PRODUCTION_URL.should.equal(Constants.API_BASE_PRODUCTION_URL)
    });

    it('MasterCardAPI.API_BASE_SANDBOX_URL should equal Constants.API_BASE_SANDBOX_URL', function () {
        MasterCardAPI.API_BASE_SANDBOX_URL.should.equal(Constants.API_BASE_SANDBOX_URL)
    });

    it('test init');
    it('test execute');

});