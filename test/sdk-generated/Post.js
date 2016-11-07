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
    operationConfigs["f57f727a-0f44-4b8f-9e30-3935ca1eb273"] = new MasterCardAPI.OperationConfig("/mock_crud_server/posts", "list", ["max"], [""]);
    operationConfigs["2e0acb77-4441-41e1-a8e4-2dff5f601b90"] = new MasterCardAPI.OperationConfig("/mock_crud_server/posts", "create", [""], [""]);
    operationConfigs["6f1d5216-c248-4218-a501-242e1607489b"] = new MasterCardAPI.OperationConfig("/mock_crud_server/posts/{id}", "read", [""], [""]);
    operationConfigs["fb225a42-acfe-4122-bbff-68340d9a039c"] = new MasterCardAPI.OperationConfig("/mock_crud_server/posts/{id}", "update", [""], [""]);
    operationConfigs["6f6b5576-e80c-454b-84e0-6d29b4893155"] = new MasterCardAPI.OperationConfig("/mock_crud_server/posts/{id}", "delete", [""], [""]);
    
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

    
/**
 * Function to retrieve a list Post objects.
 *
 * @method list
 * @param {Object} params - A map of parameters in which to define the Post list from.
 * @param {Function} callback A function to handle success/error responses from the API.<br/>
 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
 */
Post.list = function(params, callback) {
    var params = MasterCardAPI.isSet(params) ? params : {};

    try {
        MasterCardAPI.execute({
            operationConfig: _getOperationConfig("f57f727a-0f44-4b8f-9e30-3935ca1eb273"),
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
            operationConfig: _getOperationConfig("2e0acb77-4441-41e1-a8e4-2dff5f601b90"),
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
    if (id) {
        params.id = id;
    }

    try {
        MasterCardAPI.execute({
            operationConfig: _getOperationConfig("6f1d5216-c248-4218-a501-242e1607489b"),
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
            operationConfig: _getOperationConfig("fb225a42-acfe-4122-bbff-68340d9a039c"),
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
    if (id) {
        params.id = id;
    }


    try {
        MasterCardAPI.execute({
            operationConfig: _getOperationConfig("6f6b5576-e80c-454b-84e0-6d29b4893155"),
            operationMetaData: _getOperationMetaData(),
            params: params
        }, callback);
    }
    catch (e) {
        callback(e, null);
    }

};

module.exports = Post;