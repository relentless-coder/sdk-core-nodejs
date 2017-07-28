var constants = require('../lib/constants');

// Imports for Test
var should = require('should');

// Variables for test
var pkgJson = require('../package.json');

describe('constants', function() {
    

    it('Version is same as package.json', function () {
        constants.VERSION.should.equal(pkgJson.version);
    });

    it('getCoreVersion', function() {
       constants.getCoreVersion().should.equal("NodeJS_SDK:1.4.1") 
    });
});