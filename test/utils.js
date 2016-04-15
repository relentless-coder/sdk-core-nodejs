var utils = require('../lib/utils');

// Imports for Test
var should = require('should');

describe('utils', function() {
    it('1 should return true', function () {
        utils.isSet(1).should.equal(true);
    });

    it('a should return true', function () {
        utils.isSet("a").should.equal(true);
    });

    it('true should return true', function () {
        utils.isSet(true).should.equal(true);
    });

    it('false should return false', function () {
        utils.isSet(false).should.equal(false);
    });

    it('\'\' should return false', function () {
        utils.isSet('').should.equal(false);
    });

    it('null should return false', function () {
        utils.isSet(null).should.equal(false);
    });

    it('undefined should return false', function () {
        var val;
        utils.isSet(val).should.equal(false);
    });

    it('"undefined" string should return false', function () {
        utils.isSet("undefined").should.equal(true);
    });
    
    
    it('subMap should return a submap from list', function () {
        
        var params = new Array();
        params['a'] = 1;
        params['b'] = 2;
        params['c'] = 3;
        params['d'] = 4;
        
        var list = ['a', 'c'];
        
        var subMap = utils.subMap(params, list);
        subMap['a'].should.equal(1);
        subMap['c'].should.equal(3);
    });

});