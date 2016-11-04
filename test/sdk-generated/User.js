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
var User = {};
var operationConfigs = {};

/**
 * Initialize User
 * @private
 */
var _init = function() {
    operationConfigs["7c2f331f-6117-4464-8bc7-7b8537876883"] = new MasterCardAPI.OperationConfig("/mock_crud_server/users", "list", [""], [""]);
    operationConfigs["a1f3d539-36eb-4ae5-b481-bce5d9f54ce5"] = new MasterCardAPI.OperationConfig("/mock_crud_server/users", "create", [""], [""]);
    operationConfigs["c607617d-d47a-48bf-b84e-932f3e34cee5"] = new MasterCardAPI.OperationConfig("/mock_crud_server/users/{id}", "read", [""], [""]);
    operationConfigs["3ba80ff7-df8f-4272-8e52-a140bb0211a3"] = new MasterCardAPI.OperationConfig("/mock_crud_server/users/{id}", "update", [""], [""]);
    operationConfigs["62e8b307-9a9f-438e-8e2f-c484f6de7813"] = new MasterCardAPI.OperationConfig("/mock_crud_server/users/{id}", "delete", [""], [""]);
    operationConfigs["61d19e5f-aba9-45d4-9440-2edb6b54b9ad"] = new MasterCardAPI.OperationConfig("/mock_crud_server/users200/{id}", "delete", [""], [""]);
    operationConfigs["949340ed-c938-489d-8f69-51fbdd916c75"] = new MasterCardAPI.OperationConfig("/mock_crud_server/users204/{id}", "delete", [""], [""]);
    
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
 * Function to retrieve a list User objects.
 *
 * @method list
 * @param {Object} params - A map of parameters in which to define the User list from.
 * @param {Function} callback A function to handle success/error responses from the API.<br/>
 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
 */
User.list = function(params, callback) {
    var params = MasterCardAPI.isSet(params) ? params : {};

    try {
        MasterCardAPI.execute({
            operationConfig: _getOperationConfig("7c2f331f-6117-4464-8bc7-7b8537876883"),
            operationMetaData: _getOperationMetaData(),
            params: params
        }, callback);
    }
    catch (e) {
        callback(e, null);
    }

};

    
/**
 * Function to create a User object.
 *
 * @method create
 * @param {Object} params - A map of parameters in which to create the User from.
 * @param {Function} callback - A function to handle success/error responses from the API.<br/>
 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
 */
User.create = function(params, callback) {
    try {
        MasterCardAPI.execute({
            operationConfig: _getOperationConfig("a1f3d539-36eb-4ae5-b481-bce5d9f54ce5"),
            operationMetaData: _getOperationMetaData(),
            params: params
        }, callback);
    }
    catch (e) {
        callback(e, null);
    }

};
    
/**
 * Function to retrieve a User object from the API.
 *
 * @method find
 * @param {String} id - The ID of the User to retrieve
 * @param {Object} query - A map of parameters in which to create the User from.
 * @param {Function} callback - A function to handle success/error responses from the API.<br/>
 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
 */
User.read = function(id, query, callback) {
    var params = MasterCardAPI.isSet(query) ? query : {};
    if (id) {
        params.id = id;
    }

    try {
        MasterCardAPI.execute({
            operationConfig: _getOperationConfig("c607617d-d47a-48bf-b84e-932f3e34cee5"),
            operationMetaData: _getOperationMetaData(),
            params: params
        }, callback);
    }
    catch (e) {
        callback(e, null);
    }

};
    
/**
 * Function to update a User object.
 *
 * @method update
 * @param {Object} params - A map of parameters on which to update the User object.
 * @param {Function} callback - A function to handle success/error responses from the API.<br/>
 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
 */
User.update = function(params, callback) {
    try {
        MasterCardAPI.execute({
            operationConfig: _getOperationConfig("3ba80ff7-df8f-4272-8e52-a140bb0211a3"),
            operationMetaData: _getOperationMetaData(),
            params: params
        }, callback);
    }
    catch (e) {
        callback(e, null);
    }

};

    
/**
 * Function to delete a User object.
 *
 * @method delete
 * @param {String} id - A string ID of the User to delete.
 * @param {Object} map - a map of additional parameters
 * @param {Function} callback - A function to handle success/error responses from the API.<br/>
 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
 */
User.delete = function(id, map, callback) {
    var params = MasterCardAPI.isSet(map) ? map : {};
    if (id) {
        params.id = id;
    }


    try {
        MasterCardAPI.execute({
            operationConfig: _getOperationConfig("62e8b307-9a9f-438e-8e2f-c484f6de7813"),
            operationMetaData: _getOperationMetaData(),
            params: params
        }, callback);
    }
    catch (e) {
        callback(e, null);
    }

};
    
/**
 * Function to delete a User object.
 *
 * @method delete
 * @param {String} id - A string ID of the User to delete.
 * @param {Object} map - a map of additional parameters
 * @param {Function} callback - A function to handle success/error responses from the API.<br/>
 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
 */
User.delete200 = function(id, map, callback) {
    var params = MasterCardAPI.isSet(map) ? map : {};
    if (id) {
        params.id = id;
    }


    try {
        MasterCardAPI.execute({
            operationConfig: _getOperationConfig("61d19e5f-aba9-45d4-9440-2edb6b54b9ad"),
            operationMetaData: _getOperationMetaData(),
            params: params
        }, callback);
    }
    catch (e) {
        callback(e, null);
    }

};
    
/**
 * Function to delete a User object.
 *
 * @method delete
 * @param {String} id - A string ID of the User to delete.
 * @param {Object} map - a map of additional parameters
 * @param {Function} callback - A function to handle success/error responses from the API.<br/>
 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
 */
User.delete204 = function(id, map, callback) {
    var params = MasterCardAPI.isSet(map) ? map : {};
    if (id) {
        params.id = id;
    }


    try {
        MasterCardAPI.execute({
            operationConfig: _getOperationConfig("949340ed-c938-489d-8f69-51fbdd916c75"),
            operationMetaData: _getOperationMetaData(),
            params: params
        }, callback);
    }
    catch (e) {
        callback(e, null);
    }

};

module.exports = User;