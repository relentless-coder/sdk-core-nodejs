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

    beforeEach( function() {
        var authentication = new MasterCardAPI.OAuth(clientId, p12Path, alias, password);

        MasterCardAPI.init({
            sandbox: true,
            authentication: authentication
        });
    });

    afterEach( function() {
        MasterCardAPI.setProxy(null);
    });

    it('send valid request', function(done){
        

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


    // it('send valid request with proxy', function(done){
        
    //     MasterCardAPI.setProxy("http://127.0.0.1:9999");

    //     var request = {
    //         "AccountInquiry": {
    //             "AccountNumber": "5343434343434343"
    //         }
    //     };

    //     MasterCardAPI.execute({
    //         operationConfig: operationConfig,
    //         operationMetaData: operationMetaData,
    //         params: request
    //     },
    //     function (error, data) {
    //         data.Account.Status.should.equal(true);
    //         data.Account.Listed.should.equal(true);
    //         data.Account.ReasonCode.should.equal("S");
    //         data.Account.Reason.should.equal("STOLEN");
    //         done();
    //     });

    // });

    it('send valid request', function(done){

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
            error.getHttpStatus().should.equal(400);
            error.getMessage().should.equal("Unknown Error");
            error.getReasonCode().should.equal("SYSTEM_ERROR");
            error.getSource().should.equal("System");
            
            done();
        });

    });

});