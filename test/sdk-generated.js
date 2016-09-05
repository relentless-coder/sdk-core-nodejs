var Post = require('./sdk-generated/Post');
var UserPostHeader = require('./sdk-generated/UserPostHeader');
var UserPostPath = require('./sdk-generated/UserPostPath');
var MasterCardAPI = require('../index');
var mastercardError = require('../lib/error');
var mockAuthentication = require("./mock/mock-authentication");

// Imports for Test
var should = require('should');
var assert = require('assert');

describe('Post', function () {

    before(function() {
        MasterCardAPI.testInit({
            sandbox: true,
            authentication: mockAuthentication
        });
    });  
    
    it('test Action.list from Post --> 200', function (done) {

        Post.list({}, function (error, data) {
                data[0].id.should.equal(1);
                data[0].title.should.equal("My Title");
                data[0].body.should.equal("some body text");
                data[0].userId.should.equal(1);
                done();
        });
        
    });
    
    
    it('test Action.list from Post with criteria --> 200', function (done) {
        
        Post.list({'notUserId': 10}, function (error, data) {
                data[0].id.should.equal(1);
                data[0].title.should.equal("My Title");
                data[0].body.should.equal("some body text");
                data[0].userId.should.equal(1);
                done();
        });
        
    });
    
    
    it('test Action.query from Post--> 200', function (done) {
        
        Post.query({id: 1}, function (error, data) {
                data.id.should.equal(1);
                data.title.should.equal("My Title");
                data.body.should.equal("some body text");
                data.userId.should.equal(1);
                done();
        });
        
    });
    
    it('test Action.read from Post--> 200', function (done) {
        
        Post.read("1", {}, function (error, data) {
                data.id.should.equal(1);
                data.title.should.equal("My Title");
                data.body.should.equal("some body text");
                data.userId.should.equal(1);
                done();
        });
        
    });
    
    it('test Action.read from Post--> 500', function (done) {
        
        Post.read("aaaa", {}, function (error, data) {
            error.message.should.equal("Error executing API call");
            done();
        });
        
    });
    
    
    it('test Action.read from Post with criteria --> 200', function (done) {
        
        Post.read("1", {'notUserId': 10}, function (error, data) {
            data.id.should.equal(1);
            data.title.should.equal("My Title");
            data.body.should.equal("some body text");
            data.userId.should.equal(1);
            done();
        });
    });
    
    
    it('test Action.create from Post --> 200', function (done) {
        
        Post.create({'title': 'My Title', 'body': 'some body text'}, function (error, data) {
            data.id.should.equal(1);
            data.title.should.equal("My Title");
            data.body.should.equal("some body text");
            data.userId.should.equal(1);
            done();
        });
    });
    
    
    it('test Action.update from Post --> 200', function (done) {
        
        Post.update({id: 1, 'title': 'update Title', 'body': 'update body text'}, function (error, data) {
            data.id.should.equal(1);
            data.title.should.equal('update Title');
            data.body.should.equal('update body text');
            data.userId.should.equal(1);
            done();

        });
    });
    
    
    it('test Action.delete from Post --> 200', function (done) {
        
        Post.delete("1", {}, function (error, data) {
            assert(data  != null);
            done();
        });
    });
    
    
    it('test Action.list from UserPostPath --> 200', function (done) {
        
        UserPostPath.list({user_id: 1}, function (error, data) {
            data[0].id.should.equal(1);
            data[0].title.should.equal("My Title");
            data[0].body.should.equal("some body text");
            data[0].userId.should.equal(1);
            done();
        });
    });
    
    
    it('test Action.list from UserPostHeader --> 200', function (done) {
        
        UserPostHeader.list({user_id: 1}, function (error, data) {
            data[0].id.should.equal(1);
            data[0].title.should.equal("My Title");
            data[0].body.should.equal("some body text");
            data[0].userId.should.equal(1);
            done();
        });
    });
    

});
