var Utils = require('../lib/utils');
var should = require('should');

describe('Utils', function() {
    it('1 should return true', function () {
        Utils.isSet(1).should.equal(true);
    });

    it('a should return true', function () {
        Utils.isSet("a").should.equal(true);
    });

    it('true should return true', function () {
        Utils.isSet(true).should.equal(true);
    });

    it('false should return false', function () {
        Utils.isSet(false).should.equal(false);
    });

    it('\'\' should return false', function () {
        Utils.isSet('').should.equal(false);
    });

    it('null should return false', function () {
        Utils.isSet(null).should.equal(false);
    });

    it('undefined should return false', function () {
        var val;
        Utils.isSet(val).should.equal(false);
    });

    it('"undefined" string should return false', function () {
        Utils.isSet("undefined").should.equal(true);
    });

});