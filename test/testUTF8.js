// Imports for Test
var MasterCardAPI = require('../index');

// variables for test
var clientId = "L5BsiPgaF-O3qA36znUATgQXwJB6MRoMSdhjd7wt50c97279!50596e52466e3966546d434b7354584c4975693238513d3d";
var p12Path = "./keystore/mcapi_sandbox_key.p12";
var alias = "test";
var password = "password";

var operationConfig = new MasterCardAPI.OperationConfig("/mcapitest/JsonNativePostPublic", "create", [""], [""]);
var operationMetaData = new MasterCardAPI.OperationMetaData("1.0.0", "http://echo.jpillora.com/");

describe('test UTF-8', function() {

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

    it('send valid request and check response', function(done){
        

        var request = {
            "JSONEcho": {
                "string": "мảŝťễřÇāŕď Ľẵвš ạאָđ мãśţēяĈẫřđ ĀקÏ ŕồçҝş..."
            }
        };

        MasterCardAPI.execute({
            operationConfig: operationConfig,
            operationMetaData: operationMetaData,
            params: request
        },
        function (error, data) {

            var body = data.body;
            var bodyMap = JSON.parse(body)
            
            bodyMap.JSONEcho.string.should.equal("мảŝťễřÇāŕď Ľẵвš ạאָđ мãśţēяĈẫřđ ĀקÏ ŕồçҝş...");
            done();
        });

    });


});