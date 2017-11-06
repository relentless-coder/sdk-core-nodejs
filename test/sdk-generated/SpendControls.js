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
var Combinationctrlsalertresource = {};
var operationConfigs = {};

/**
 * Initialize Combinationctrlsalertresource
 * @private
 */
var _init = function() {
	operationConfigs["456e61df-6838-4403-aebc-e9516f627918"] = new MasterCardAPI.OperationConfig("/issuer/spendcontrols/v1/card/{uuid}/controls/alerts/filters", "query", [""], [""]);
	operationConfigs["3749b6de-4bb7-41c0-afb8-213a2d1ba64e"] = new MasterCardAPI.OperationConfig("/issuer/spendcontrols/v1/card/{uuid}/controls/alerts/filters", "create", [""], [""]);
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
	return new MasterCardAPI.OperationMetaData("0.0.1", "https://sandbox.api.mastercard.com", "", "true");
};

/**
 * Function to query a Combinationctrlsalertresource object from the API.
 *
 * @method find
 * @param {Object} query - A map of parameters in which to create the Combinationctrlsalertresource from.
 * @param {Function} callback - A function to handle success/error responses from the API.<br/>
 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
 */
Combinationctrlsalertresource.query = function(query, callback) {
	var params = MasterCardAPI.isSet(query) ? query : {};

	try {
		MasterCardAPI.execute({
			operationConfig: _getOperationConfig("456e61df-6838-4403-aebc-e9516f627918"),
			operationMetaData: _getOperationMetaData(),
			params: params
		}, callback);
	}
	catch (e) {
		callback(e, null);
	}

};
/**
 * Function to create a Combinationctrlsalertresource object.
 *
 * @method create
 * @param {Object} params - A map of parameters in which to create the Combinationctrlsalertresource from.
 * @param {Function} callback - A function to handle success/error responses from the API.<br/>
 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
 */
Combinationctrlsalertresource.create = function(params, callback) {
	try {
		MasterCardAPI.execute({
			operationConfig: _getOperationConfig("3749b6de-4bb7-41c0-afb8-213a2d1ba64e"),
			operationMetaData: _getOperationMetaData(),
			params: params
		}, callback);
	}
	catch (e) {
		callback(e, null);
	}

};

module.exports = Combinationctrlsalertresource;