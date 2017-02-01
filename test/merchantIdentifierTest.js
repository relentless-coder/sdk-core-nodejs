var MasterCardAPI = require('../index');
var Constants = require('../lib/constants');
var OperationConfig = require('../lib/operation-config');
var OperationMetaData = require('../lib/operation-metadata');
var MerchantIdentifier = require('./sdk-generated/MerchantIdentifier');

// Imports for Test
var should = require('should');

// variables for test
var clientId = "L5BsiPgaF-O3qA36znUATgQXwJB6MRoMSdhjd7wt50c97279!50596e52466e3966546d434b7354584c4975693238513d3d";
var p12Path = "./keystore/mcapi_sandbox_key.p12";
var alias = "test";
var password = "password";



//MasterCardAPI.API_BASE_SANDBOX_URL = "http://localhost:8080";

describe('test MerchantIdentifier', function() {
    
    
//    it('test merchant-identifier.MICROSOFT', function(done) {
//
//        var authentication = new MasterCardAPI.OAuth(clientId, p12Path, alias, password);
//
//        MasterCardAPI.init({
//            sandbox: true,
//            debug: false,
//            authentication: authentication
//        });
//        
//        var requestData = {
//            "MerchantId": "MICROSOFT",
//            "Type": "FuzzyMatch"
//        };
//
//        MerchantIdentifier.query(requestData
//        , function (error, data) {
//            if (error) {
//                console.log(error);
//                throw error;
//            }
//
//            data.MerchantIds.Message.should.equal("7 merchants found.");
//            done();
//        });
//    });
    
    
    
        it('test merchant-identifier.GOOGLE', function(done) {

        var authentication = new MasterCardAPI.OAuth(clientId, p12Path, alias, password);

        MasterCardAPI.init({
            sandbox: true,
            debug: false,
            authentication: authentication
        });
        
        var requestData = {
            "MerchantId": "GOOGLE LTD ADWORDS (CC@GOOGLE.COM)",
            "Type": "ExactMatch"
        };

        MerchantIdentifier.query(requestData
        , function (error, data) {
            if (error) {
                error.getHttpStatus().should.equal(500);
                error.getMessage().should.equal("Error executing API call");
                error.getReasonCode().should.equal("DESCRIPTOR_NOT_FOUND");
                error.getSource().should.equal("System");
            }

            //data.MerchantIds.Message.should.equal("7 merchants found.");
            done();
        });
    });

    
});
