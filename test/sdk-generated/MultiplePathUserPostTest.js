// Imports for Test
var sleep = require('sleep');
var chai = require('chai');
chai.use(require('chai-string'));
var assert = chai.assert;

var testClass = require('./index');
var MasterCardAPI = testClass.MasterCardAPI;

//MasterCardAPI.API_BASE_SANDBOX_URL = "http://localhost:8080";

describe('test MultiplePathUserPost', function() {
before(function() {
    global.testUtil.resetAuthentication();
});
    
    
    
        it('get_user_posts_with_mutplie_path', function(done) {
        
        
        sleep.sleep(1);
        

        var requestData = {
  "user_id": "1",
  "post_id": "2"
};

        

        testClass.MultiplePathUserPost.list(requestData
        , function (error, data) {
            global.testUtil.putResponse("get_user_posts_with_mutplie_path", data);
            

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

    
    
    
    
    
    
        it('update_user_posts_with_mutplie_path', function(done) {
        

        

        var requestData = {
  "user_id": 1,
  "post_id": 1,
  "testQuery": "testQuery",
  "name": "Joe Bloggs",
  "username": "jbloggs",
  "email": "name@example.com",
  "phone": "1-770-736-8031",
  "website": "hildegard.org",
  "address": {
    "line1": "2000 Purchase Street",
    "city": "New York",
    "state": "NY",
    "postalCode": "10577"
  }
};

        

        testClass.MultiplePathUserPost.update(requestData
        , function (error, data) {
            global.testUtil.putResponse("update_user_posts_with_mutplie_path", data);
            

            if (error) {
                console.log(error);
                throw error;
            }

            var ignoreAsserts = [];
            

            global.testUtil.assertEqual(ignoreAsserts, "website", data, "hildegard.org");
            global.testUtil.assertEqual(ignoreAsserts, "address.instructions.doorman", data, "true");
            global.testUtil.assertEqual(ignoreAsserts, "address.instructions.text", data, "some delivery instructions text");
            global.testUtil.assertEqual(ignoreAsserts, "address.city", data, "New York");
            global.testUtil.assertEqual(ignoreAsserts, "address.postalCode", data, "10577");
            global.testUtil.assertEqual(ignoreAsserts, "address.id", data, "1");
            global.testUtil.assertEqual(ignoreAsserts, "address.state", data, "NY");
            global.testUtil.assertEqual(ignoreAsserts, "address.line1", data, "2000 Purchase Street");
            global.testUtil.assertEqual(ignoreAsserts, "phone", data, "1-770-736-8031");
            global.testUtil.assertEqual(ignoreAsserts, "name", data, "Joe Bloggs");
            global.testUtil.assertEqual(ignoreAsserts, "id", data, "1");
            global.testUtil.assertEqual(ignoreAsserts, "email", data, "name@example.com");
            global.testUtil.assertEqual(ignoreAsserts, "username", data, "jbloggs");
            

            done();
        });
    });

    
    
    
    
    
    
    
    
    
        it('delete_user_posts_with_mutplie_path', function(done) {
        

        

        var requestData = {
  "user_id": "1",
  "post_id": "2"
};

        
        var id = requestData["id"] ? requestData["id"] : "";

        testClass.MultiplePathUserPost.delete(id, requestData
        , function (error, data) {
            global.testUtil.putResponse("delete_user_posts_with_mutplie_path", data);
            

            if (error) {
                console.log(error);
                throw error;
            }

            var ignoreAsserts = [];
            

            

            done();
        });
    });

    
    
    
});
