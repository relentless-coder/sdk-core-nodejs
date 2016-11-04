// Imports for Test
var chai = require('chai');
chai.use(require('chai-string'));
var assert = chai.assert;

var testClass = require('./index');
var MasterCardAPI = testClass.MasterCardAPI;

var testUtil = {};
var responses = {};
var authentications = {};

// Set authentications
authentications["default"] = new MasterCardAPI.OAuth("L5BsiPgaF-O3qA36znUATgQXwJB6MRoMSdhjd7wt50c97279!50596e52466e3966546d434b7354584c4975693238513d3d", "./keystore/mcapi_sandbox_key.p12", "test", "password");

testUtil.putResponse = function(name, response) {
    responses[name] = response;
};


testUtil.setMapValue = function(map, key, value) {
    var items = key.split(".");
    var property;
    for (var i = 0; i < items.length; i++) {
        property = items[i];
        if ((i+1) == items.length) {
            map[property] = value;
        } else {
            map = map[property];
        }
    }
}

testUtil.getListIndex = function(key) {
    var matches = key.match(/\[(.*?)\]/);
    if (matches) {
        return matches[1];
    } else {
        return null;
    }
}

testUtil.getMapValue = function(map, key) {
    var items = key.split(".");
    var property;
    for (var i = 0; i < items.length; i++) {
        property = items[i];
        if ((i+1) == items.length) {
            var arrayIndex = testUtil.getListIndex(property);
            if (arrayIndex) {
                arrayKey = property.substring(0, property.indexOf('['));
                var arrayIndexInt = parseInt(arrayIndex);
                return map[arrayKey][arrayIndexInt];
            } else {
                return map[property];
            }

        } else {
            var arrayIndex = testUtil.getListIndex(property);
            if (arrayIndex) {
                arrayKey = property.substring(0, property.indexOf('['));
                var arrayIndexInt = parseInt(arrayIndex);
                map = map[arrayKey][arrayIndexInt];
            } else {
                map = map[property];
            }
        }
    }
}

testUtil.resolveResponseValue = function (overrideValue) {

    //arizzini: if plain value, return it.
    if (overrideValue.startsWith("val:")) {
    	return overrideValue.substring(4);
    } else {
        var i = overrideValue.indexOf(".");

        var name = overrideValue.substring(0, i);
        var key = overrideValue.substring(i + 1);

        var response = responses[name];

        var value = null;

        if (response) {
            value = testUtil.getMapValue(response, key);
        }
        else {
            console.error("No response entry found for example " + name);
        }

        return value;
    }
};

testUtil.assertEqual = function(ignoreAsserts, key, map, expectedValue) {
    if (!testUtil.contains(ignoreAsserts, key)) {
        var actualValue = testUtil.getMapValue(map, key);
        if (actualValue) {
            assert.equalIgnoreCase(expectedValue, actualValue.toString());
        }

    }
};

testUtil.contains = function(array, obj) {
    var i = array.length;
    while (i--) {
        if (array[i] === obj) {
            return true;
        }
    }
    return false;
};

testUtil.setAuthentication = function(keyId) {
    var authentication = authentications[keyId];

    if (!MasterCardAPI.isSet(authentication)) {
        throw "No authentication found for keyId: " + keyId;
    }

    MasterCardAPI.init({
        sandbox: true,
        authentication: authentication
    });
};

testUtil.resetAuthentication = function() {
    testUtil.setAuthentication("default");
};

global.testUtil = testUtil;