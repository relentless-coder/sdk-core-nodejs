var MasterCardAPI = require('../../index');
var mockcrud = {};

mockcrud.MasterCardAPI = MasterCardAPI;
mockcrud.UserPostPath = require('./UserPostPath');
mockcrud.User = require('./User');
mockcrud.Post = require('./Post');
mockcrud.UserPostHeader = require('./UserPostHeader');
mockcrud.MultiplePathUserPost = require('./MultiplePathUserPost');

// SDK Config
mockcrud.SdkConfig = require('./sdk-config');

module.exports = mockcrud;
