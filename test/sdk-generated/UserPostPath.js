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
var UserPostPath = {};
var operationConfigs = {};

/**
 * Initialize UserPostPath
 * @private
 */
var _init = function() {
    operationConfigs["b9d165fb-0a50-4a5d-9166-137461373cda"] = new MasterCardAPI.OperationConfig("/mock_crud_server/users/{user_id}/posts", "list", [""], [""]);
    
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
 * Function to retrieve a list UserPostPath objects.
 *
 * @method list
 * @param {Object} params - A map of parameters in which to define the UserPostPath list from.
 * @param {Function} callback A function to handle success/error responses from the API.<br/>
 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
 */
UserPostPath.list = function(params, callback) {
    if (!MasterCardAPI.isSet(params)) {
        params = {};
    }

    try {
        MasterCardAPI.execute({
            operationConfig: _getOperationConfig("b9d165fb-0a50-4a5d-9166-137461373cda"),
            operationMetaData: _getOperationMetaData(),
            params: params
        }, callback);
    }
    catch (e) {
        callback(e, null);
    }

};


module.exports = UserPostPath;