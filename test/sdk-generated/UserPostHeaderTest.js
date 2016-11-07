// Imports for Test
var sleep = require('sleep');
var chai = require('chai');
chai.use(require('chai-string'));
var assert = chai.assert;

var testClass = require('./index');
var MasterCardAPI = testClass.MasterCardAPI;

//MasterCardAPI.API_BASE_SANDBOX_URL = "http://localhost:8080";

describe('test UserPostHeader', function() {
before(function() {
    global.testUtil.resetAuthentication();
});
    
    
    
        it('get_user_posts_with_header', function(done) {
        

        

        var requestData = {
  "user_id": "1"
};

        

        testClass.UserPostHeader.list(requestData
        , function (error, data) {
            global.testUtil.putResponse("get_user_posts_with_header", data);
            

            if (error) {
                console.log(error);
                throw error;
            }

            var ignoreAsserts = [];
            

            global.testUtil.assertEqual(ignoreAsserts, "id", data[0], "1");
            global.testUtil.assertEqual(ignoreAsserts, "title", data[0], "My Title");
            global.testUtil.assertEqual(ignoreAsserts, "body", data[0], "some body text");
            global.testUtil.assertEqual(ignoreAsserts, "userId", data[0], "1");
            

            done();
        });
    });

    
    
    
    
});
