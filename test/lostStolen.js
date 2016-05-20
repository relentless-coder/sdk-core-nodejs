// Imports for Test
var MasterCardAPI = require('../index');

// variables for test
var clientId = "gVaoFbo86jmTfOB4NUyGKaAchVEU8ZVPalHQRLTxeaf750b6!414b543630362f426b4f6636415a5973656c33735661383d";
var p12Path = "./keystore/prod_key.p12";
var alias = "test";
var password = "password";

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
            action: "update",
            path: "/fraud/loststolen/v1/account-inquiry",
            headerList: [],
            params: request
        },
        function (error, data) {
            data.Account.Status.should.equal('true');
            data.Account.Listed.should.equal('true');
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
            action: "update",
            path: "/fraud/loststolen/v1/account-inquiry",
            headerList: [],
            params: request
        },
        function (error, data) {
            error.status.should.equal(400);
            done();
        });

    });

});