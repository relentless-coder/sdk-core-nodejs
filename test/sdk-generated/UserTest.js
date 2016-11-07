// Imports for Test
var sleep = require('sleep');
var chai = require('chai');
chai.use(require('chai-string'));
var assert = chai.assert;

var testClass = require('./index');
var MasterCardAPI = testClass.MasterCardAPI;

//MasterCardAPI.API_BASE_SANDBOX_URL = "http://localhost:8080";

describe('test User', function() {
before(function() {
    global.testUtil.resetAuthentication();
});
    
    
    
        it('list_users', function(done) {
        

        var requestData = {};

        

        testClass.User.list(requestData
        , function (error, data) {
            global.testUtil.putResponse("list_users", data);
            

            if (error) {
                console.log(error);
                throw error;
            }

            var ignoreAsserts = [];
            

            global.testUtil.assertEqual(ignoreAsserts, "website", data[0], "hildegard.org");
            global.testUtil.assertEqual(ignoreAsserts, "address.instructions.doorman", data[0], "true");
            global.testUtil.assertEqual(ignoreAsserts, "address.instructions.text", data[0], "some delivery instructions text");
            global.testUtil.assertEqual(ignoreAsserts, "address.city", data[0], "New York");
            global.testUtil.assertEqual(ignoreAsserts, "address.postalCode", data[0], "10577");
            global.testUtil.assertEqual(ignoreAsserts, "address.id", data[0], "1");
            global.testUtil.assertEqual(ignoreAsserts, "address.state", data[0], "NY");
            global.testUtil.assertEqual(ignoreAsserts, "address.line1", data[0], "2000 Purchase Street");
            global.testUtil.assertEqual(ignoreAsserts, "phone", data[0], "1-770-736-8031");
            global.testUtil.assertEqual(ignoreAsserts, "name", data[0], "Joe Bloggs");
            global.testUtil.assertEqual(ignoreAsserts, "id", data[0], "1");
            global.testUtil.assertEqual(ignoreAsserts, "email", data[0], "name@example.com");
            global.testUtil.assertEqual(ignoreAsserts, "username", data[0], "jbloggs");
            

            done();
        });
    });
    it('list_users_query', function(done) {
        

        

        var requestData = {
  "max": "10"
};

        

        testClass.User.list(requestData
        , function (error, data) {
            global.testUtil.putResponse("list_users_query", data);
            

            if (error) {
                console.log(error);
                throw error;
            }

            var ignoreAsserts = [];
            

            global.testUtil.assertEqual(ignoreAsserts, "website", data[0], "hildegard.org");
            global.testUtil.assertEqual(ignoreAsserts, "address.instructions.doorman", data[0], "true");
            global.testUtil.assertEqual(ignoreAsserts, "address.instructions.text", data[0], "some delivery instructions text");
            global.testUtil.assertEqual(ignoreAsserts, "address.city", data[0], "New York");
            global.testUtil.assertEqual(ignoreAsserts, "address.postalCode", data[0], "10577");
            global.testUtil.assertEqual(ignoreAsserts, "address.id", data[0], "1");
            global.testUtil.assertEqual(ignoreAsserts, "address.state", data[0], "NY");
            global.testUtil.assertEqual(ignoreAsserts, "address.line1", data[0], "2000 Purchase Street");
            global.testUtil.assertEqual(ignoreAsserts, "phone", data[0], "1-770-736-8031");
            global.testUtil.assertEqual(ignoreAsserts, "name", data[0], "Joe Bloggs");
            global.testUtil.assertEqual(ignoreAsserts, "id", data[0], "1");
            global.testUtil.assertEqual(ignoreAsserts, "email", data[0], "name@example.com");
            global.testUtil.assertEqual(ignoreAsserts, "username", data[0], "jbloggs");
            

            done();
        });
    });

    
    
    
    
    
        it('create_user', function(done) {
        

        

        var requestData = {
  "website": "hildegard.org",
  "address": {
    "city": "New York",
    "postalCode": "10577",
    "state": "NY",
    "line1": "2000 Purchase Street"
  },
  "phone": "1-770-736-8031",
  "name": "Joe Bloggs",
  "email": "name@example.com",
  "username": "jbloggs"
};

        

        testClass.User.create(requestData
        , function (error, data) {
            global.testUtil.putResponse("create_user", data);
            

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

    
    
    
    
    
    
    
    
    
    
    
        it('get_user', function(done) {
        

        

        var requestData = {};

        global.testUtil.setMapValue(requestData, "id",  global.testUtil.resolveResponseValue("create_user.id"));
        
        var id = requestData["id"] ? requestData["id"] : "";

        testClass.User.read(id, requestData
        , function (error, data) {
            global.testUtil.putResponse("get_user", data);
            

            if (error) {
                console.log(error);
                throw error;
            }

            var ignoreAsserts = [];
            ignoreAsserts.push("address.city");
            

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
    it('get_user_query', function(done) {
        

        

        var requestData = {
  "min": 1,
  "max": 10
};

        global.testUtil.setMapValue(requestData, "id",  global.testUtil.resolveResponseValue("create_user.id"));
        
        var id = requestData["id"] ? requestData["id"] : "";

        testClass.User.read(id, requestData
        , function (error, data) {
            global.testUtil.putResponse("get_user_query", data);
            

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

    
    
    
    
        it('update_user', function(done) {
        

        

        var requestData = {
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

        global.testUtil.setMapValue(requestData, "id",  global.testUtil.resolveResponseValue("create_user.id"));
        global.testUtil.setMapValue(requestData, "id2",  global.testUtil.resolveResponseValue("create_user.id"));
        global.testUtil.setMapValue(requestData, "prepend",  "prepend"+global.testUtil.resolveResponseValue("create_user.id"));
        global.testUtil.setMapValue(requestData, "append",  global.testUtil.resolveResponseValue("create_user.id")+"append");
        global.testUtil.setMapValue(requestData, "complex",  "prepend-"+global.testUtil.resolveResponseValue("create_user.id")+"-"+global.testUtil.resolveResponseValue("create_user.name"));
        global.testUtil.setMapValue(requestData, "name",  global.testUtil.resolveResponseValue("val:Andrea Rizzini"));
        

        testClass.User.update(requestData
        , function (error, data) {
            global.testUtil.putResponse("update_user", data);
            

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

    
    
    
    
    
    
    
    
    
        it('delete_user', function(done) {
        

        

        var requestData = {};

        global.testUtil.setMapValue(requestData, "id", global.testUtil.resolveResponseValue("create_user.id"));
        
        var id = requestData["id"] ? requestData["id"] : "ssss";

        testClass.User.delete(id, requestData
        , function (error, data) {
            global.testUtil.putResponse("delete_user", data);
            

            if (error) {
                console.log(error);
                throw error;
            }

            var ignoreAsserts = [];
            

            

            done();
        });
    });

    
    
    
    
    
    
    
        it('delete_user_200', function(done) {
        

        

        var requestData = {};

        global.testUtil.setMapValue(requestData, "id", global.testUtil.resolveResponseValue("create_user.id"));
        
        var id = requestData["id"] ? requestData["id"] : "ssss";

        testClass.User.delete200(id, requestData
        , function (error, data) {
            global.testUtil.putResponse("delete_user_200", data);
            

            if (error) {
                console.log(error);
                throw error;
            }

            var ignoreAsserts = [];
            

            

            done();
        });
    });

    
    
    
    
    
    
    
        it('delete_user_204', function(done) {
        

        

        var requestData = {};

        global.testUtil.setMapValue(requestData, "id", global.testUtil.resolveResponseValue("create_user.id"));
        
        var id = requestData["id"] ? requestData["id"] : "ssss";

        testClass.User.delete204(id, requestData
        , function (error, data) {
            global.testUtil.putResponse("delete_user_204", data);
            

            if (error) {
                console.log(error);
                throw error;
            }

            var ignoreAsserts = [];
            

            

            done();
        });
    });

    
    
    
});
