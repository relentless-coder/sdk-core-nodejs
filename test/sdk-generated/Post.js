/*
 * Copyright (c) 2013 - 2016, MasterCard International Incorporated
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are 
 * permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list of 
 * conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * Neither the name of the MasterCard International Incorporated nor the names of its 
 * contributors may be used to endorse or promote products derived from this software 
 * without specific prior written permission.
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES 
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT 
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, 
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; 
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER 
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING 
 * IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF 
 * SUCH DAMAGE.
 *
 */

var MasterCardAPI = require('../../index');
var SdkConfig = require('./sdk-config');
var Post = {};
var operationConfigs = {};

/**
 * Initialize Post
 * @private
 */
var _init = function() {
    operationConfigs["564f0c16-88e4-49a6-89b9-02a078c24f86"] = new MasterCardAPI.OperationConfig("/mock_crud_server/posts", "list", ["max"], [""]);
    operationConfigs["c36da486-2fe5-49e0-8cb0-7a07a927e200"] = new MasterCardAPI.OperationConfig("/mock_crud_server/posts", "create", [""], [""]);
    operationConfigs["e86f4a01-fe24-4039-a8fb-a7d2f181ee81"] = new MasterCardAPI.OperationConfig("/mock_crud_server/posts/{id}", "read", [""], [""]);
    operationConfigs["39ce9593-7610-4ed3-b37e-66a77a27d14d"] = new MasterCardAPI.OperationConfig("/mock_crud_server/posts/{id}", "update", [""], [""]);
    operationConfigs["8b386afc-419a-41cd-b706-7537d1b8b8e6"] = new MasterCardAPI.OperationConfig("/mock_crud_server/posts/{id}", "delete", [""], [""]);

    // Added for testing
    operationConfigs["4e32ae90-7137-11e6-8b77-86f30ca893d3"] = new MasterCardAPI.OperationConfig("/mock_crud_server/posts/{id}", "query", [""], [""]);
};

_init();

/**
 * Private function to get operation config
 * @returns Object operation config
 * @private
 */
var _getOperationConfig = function(operationUUID) {
    var operationConfig = operationConfigs[operationUUID];

    if(!MasterCardAPI.isSet(operationConfig)) {
        throw new MasterCardAPI.MasterCardError.SDKError("Invalid operationUUID supplied: " + operationUUID);
    }

    return operationConfig;
};

var _getOperationMetaData = function() {
    return new MasterCardAPI.OperationMetaData(SdkConfig.getVersion(), SdkConfig.getHost());
};


// Added for testing
Post.query = function(params, callback) {
    if (!MasterCardAPI.isSet(params)) {
        params = {};
    }

    try {
        MasterCardAPI.execute({
            operationConfig: _getOperationConfig("4e32ae90-7137-11e6-8b77-86f30ca893d3"),
            operationMetaData: _getOperationMetaData(),
            params: params
        }, callback);
    }
    catch (e) {
        callback(e, null);
    }
};

/**
 * Function to retrieve a list Post objects.
 *
 * @method list
 * @param {Object} params - A map of parameters in which to define the Post list from.
 * @param {Function} callback A function to handle success/error responses from the API.<br/>
 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
 */
Post.list = function(params, callback) {
    if (!MasterCardAPI.isSet(params)) {
        params = {};
    }

    try {
        MasterCardAPI.execute({
            operationConfig: _getOperationConfig("564f0c16-88e4-49a6-89b9-02a078c24f86"),
            operationMetaData: _getOperationMetaData(),
            params: params
        }, callback);
    }
    catch (e) {
        callback(e, null);
    }

};

    
/**
 * Function to create a Post object.
 *
 * @method create
 * @param {Object} params - A map of parameters in which to create the Post from.
 * @param {Function} callback - A function to handle success/error responses from the API.<br/>
 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
 */
Post.create = function(params, callback) {
    try {
        MasterCardAPI.execute({
            operationConfig: _getOperationConfig("c36da486-2fe5-49e0-8cb0-7a07a927e200"),
            operationMetaData: _getOperationMetaData(),
            params: params
        }, callback);
    }
    catch (e) {
        callback(e, null);
    }

};
    
/**
 * Function to retrieve a Post object from the API.
 *
 * @method find
 * @param {String} id - The ID of the Post to retrieve
 * @param {Object} query - A map of parameters in which to create the Post from.
 * @param {Function} callback - A function to handle success/error responses from the API.<br/>
 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
 */
Post.read = function(id, query, callback) {
    var params = MasterCardAPI.isSet(query) ? query : {};
    params.id = id;

    try {
        MasterCardAPI.execute({
            operationConfig: _getOperationConfig("e86f4a01-fe24-4039-a8fb-a7d2f181ee81"),
            operationMetaData: _getOperationMetaData(),
            params: params
        }, callback);
    }
    catch (e) {
        callback(e, null);
    }

};
    
/**
 * Function to update a Post object.
 *
 * @method update
 * @param {Object} params - A map of parameters on which to update the Post object.
 * @param {Function} callback - A function to handle success/error responses from the API.<br/>
 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
 */
Post.update = function(params, callback) {
    try {
        MasterCardAPI.execute({
            operationConfig: _getOperationConfig("39ce9593-7610-4ed3-b37e-66a77a27d14d"),
            operationMetaData: _getOperationMetaData(),
            params: params
        }, callback);
    }
    catch (e) {
        callback(e, null);
    }

};

    
/**
 * Function to delete a Post object.
 *
 * @method delete
 * @param {String} id - A string ID of the Post to delete.
 * @param {Object} map - a map of additional parameters
 * @param {Function} callback - A function to handle success/error responses from the API.<br/>
 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
 */
Post.delete = function(id, map, callback) {
    var params = MasterCardAPI.isSet(map) ? map : {};
    params.id = id;

    try {
        MasterCardAPI.execute({
            operationConfig: _getOperationConfig("8b386afc-419a-41cd-b706-7537d1b8b8e6"),
            operationMetaData: _getOperationMetaData(),
            params: params
        }, callback);
    }
    catch (e) {
        callback(e, null);
    }

};

module.exports = Post;