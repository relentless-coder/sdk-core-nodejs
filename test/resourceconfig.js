/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var constants = require('../lib/constants');
var MasterCardAPI = require('../index');

var ResourceConfig = {};

var name = "aName"
var _override = null;
var _host = null;
var _context = null;
var _version = null;
var initialised = false;

ResourceConfig.getName = function() {
    return name;
};


ResourceConfig.getHost = function() {
    if (_override) {
        return _override;
    } 
    
    return _host;
};

ResourceConfig.getContext = function() {
    return _context;
};


ResourceConfig.getVersion = function() {
    return _version;
};

ResourceConfig.setEnvironment = function(environment) {
//    console.log("setEnvironment.... "+environment);
    if (environment in constants.EnvironmentMapping) {
        
        var tuple = constants.EnvironmentMapping[environment];
        _host = tuple[0];
        _context = tuple[1];
    } 
};

ResourceConfig.setCustomEnvironment = function(host,context) {
    _host = host;
    _context = context;
};

var _init = function() {
    if (initialised === false) {
//        console.log("initializing.... ");
        MasterCardAPI.registerResourceConfig(ResourceConfig);
        var environment = MasterCardAPI.getEnvironment();
//        console.log("environment.... "+environment);
        ResourceConfig.setEnvironment(environment);
        initialised = true;
    } 
};

_init();



module.exports = ResourceConfig;