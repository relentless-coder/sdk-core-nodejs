// Imports for Test
var MasterCardAPI = require('../index');

// variables for test
var clientId = "L5BsiPgaF-O3qA36znUATgQXwJB6MRoMSdhjd7wt50c97279!50596e52466e3966546d434b7354584c4975693238513d3d";
var p12Path = "./keystore/mcapi_sandbox_key.p12";
var alias = "test";
var password = "password";

var operationConfig = new MasterCardAPI.OperationConfig("/fraud/loststolen/v1/account-inquiry", "update", [""], [""]);
var operationMetaData = new MasterCardAPI.OperationMetaData("1.0.0", "https://sandbox.api.mastercard.com");

describe('lostStolen', function() {

    it('send valid request', function(done){
        var authentication = new MasterCardAPI.OAuth(clientId, p12Path, alias, password);

        MasterCardAPI.init({
            sandbox: true,
            authentication: authentication
        });

        var request = {
            "AccountInquiry": {
                "AccountNumber": "5343434343434343"
            }
        };

        MasterCardAPI.execute({
            operationConfig: operationConfig,
            operationMetaData: operationMetaData,
            params: request
        },
        function (error, data) {
            data.Account.Status.should.equal(true);
            data.Account.Listed.should.equal(true);
            data.Account.ReasonCode.should.equal("S");
            data.Account.Reason.should.equal("STOLEN");
            done();
        });

    });

    it('send error request', function(done){
        var authentication = new MasterCardAPI.OAuth(clientId, p12Path, alias, password);

        MasterCardAPI.init({
            sandbox: true,
            authentication: authentication
        });

        var request = {
            "AccountInquiry": {
                "AccountNumber": "1111222233334444"
            }
        };

        MasterCardAPI.execute({
            operationConfig: operationConfig,
            operationMetaData: operationMetaData,
            params: request
        },
        function (error, data) {
            error.status.should.equal(400);
            done();
        });

    });

});