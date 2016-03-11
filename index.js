/*
 * Copyright 2016 MasterCard International.
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

/**
 * This module exposes the different domain object on which different API calls can be invoked upon.
 *
 * @class MasterCardAPI
 * @static
 */
var MasterCardAPI = {};

// Imports
var masterCardError = require('./lib/error');
var constants = require('./lib/constants');
var oauth = require("./lib/security/oauth/oauth");
var utils = require("./lib/utils");
var http = require('http');
var https = require('https');
var url = require('url');

// Variables
var sandbox = false;
var authentication = null;
var initialized = false;

/**
 * Production URL
 *
 * @type {String}
 * @default Constants.API_BASE_PRODUCTION_URL value
 */
MasterCardAPI.API_BASE_PRODUCTION_URL = constants.API_BASE_PRODUCTION_URL;

/**
 * Sandbox URL
 *
 * @type {String}
 * @default Constants.API_BASE_SANDBOX_URL value
 */
MasterCardAPI.API_BASE_SANDBOX_URL = constants.API_BASE_SANDBOX_URL;

/**
 * Initialize the Core MasterCard API SDK
 *
 * @param opts
 *  {Boolean} sandbox - true (use sandbox), false (use production)
 *  {Boolean} authentication - authetnication object e.g. MasterCardAPI.OAuth
 */
MasterCardAPI.init = function (opts) {
    if (utils.isSet(opts.sandbox)) {
        sandbox = opts.sandbox;
    }

    if (utils.isSet(opts.authentication)) {
        authentication = opts.authentication;
    }
    else {
        throw new Error("Authentication must be set");
    }

    initialized = true;
};

/**
 * Function to execute an API call.
 *
 * @method execute
 * @param {Object} opts
 *      {String} path - The path for the API
 *      {String} action - The type of action being invoked on the domain object
 *      {Object} params - The request parameters
 * @param {Function} callback - A callback function to handle an success/error responses from the API
 */
MasterCardAPI.execute = function (opts, callback) {
    if (!initialized) {
        callback(new masterCardError.API('MasterCardAPI.init(opts) must be called', {error : {message: 'MasterCardAPI.init(opts) must be called' }}), null);
        return;
    }

    var path = opts.path,
        action = opts.action,
        params = opts.params;

    // Validate that the API keys are set
    if (!areAPIKeysSet(callback)) {
        return;
    }

    var uri, httpMethod;

    uri = getURI(path, action, params);
    httpMethod = getHttpMethod(action);

    var body = JSON.stringify(params);
    var authHeader = authentication.sign(uri, httpMethod, body);

    var requestOptions = getRequestOptions(httpMethod, uri, authHeader),
        protocol = http;

    if (uri.protocol === "https:") {
        protocol = https;
    }

    // Exec async API HTTP request
    var httpRequest = protocol.request(requestOptions, function (httpResponse) {
        var httpResponseData = "";

        httpResponse.setEncoding('utf8');

        // Handle successful response
        httpResponse.on('data', function (data) {
            httpResponseData += data;
        });

        httpResponse.on('end', function () {
            var jsonResponse = JSON.parse(httpResponseData);

            if (!utils.isSet(jsonResponse.error)) {
                callback(null, jsonResponse);
            } else {
                callback(new masterCardError.API('Error executing API call', jsonResponse), null);
            }
        });
    }).on('error', function (errorResponse) {

        // Catch our timeout error thrown below
        if (errorResponse.code === "ECONNRESET") {
            callback(new Error('The API request has timed out'), null);
        }

        // Return error from API call
        callback(new masterCardError.API('Error executing API call', errorResponse), null);
    }).on('socket', function (socket) {
        // Set timeout on the HTTP request
        socket.setTimeout(30000);
        socket.on('timeout', function () {
            // Killing the request which throws an Error and is caught above in the error block
            httpRequest.abort();
        });
    });

    // If POST request, then write to the body of the request
    if (requestOptions.method === "POST" || requestOptions.method === "PUT") {
        httpRequest.write(body);
    }

    httpRequest.end();
};

/**
 * Function to check whether the user's API keys are set or not.
 *
 * @method areAPIKeysSet
 * @private
 * @param {Object} auth An object containing the public & private API keys
 * @param {Function} callback A callback function to handle an errors
 * @return {Boolean} Returns true if both public & private API keys are set
 */
function areAPIKeysSet(callback) {
    if (!utils.isSet(authentication)) {
        callback(new masterCardError.API('Missing API Key - Simplify.PRIVATE_KEY'), null);
        return false;
    }

    if (!utils.isSet(authentication.consumerKey)) {
        callback(new masterCardError.API('Missing API Key - Simplify.PUBLIC_KEY'), null);
        return false;
    }

    return true;
}

/**
 * Function to build up the URI endpoint to use in the request.
 *
 * @method getURI
 * @private
 *
 * @param {String} path - The path for the API
 * @param {String} action - The type of action being invoked on the domain object
 * @param {Object} params - The request paramaters
 * @return {Object} Returns a URI object neeeded for a HTTP request
 */
function getURI(path, action, params) {
    var uri = MasterCardAPI.API_BASE_PRODUCTION_URL

    // Check if a sandbox is true and update the API endpoint accordingly
    if (sandbox) {
        uri = MasterCardAPI.API_BASE_SANDBOX_URL;
    }

    // Modify URI to point to the correct API path
    uri += path;

    // Handle Id
    switch (action) {
        case "read":
        case "update":
        case "delete":
            if (params.id) {
                uri += "/" + params.id;
                delete params.id;   // delete params
            }
            break;
    }

    // Add query params to URI if any
    switch (action) {
        case "read":
        case "list":
        case "delete":
            uri = _appendMapToQueryString(uri, params);
            break;
    }

    // Add Format=JSON
    uri = _appendMapToQueryString(uri, { Format: "JSON" });

    // Use node js 'url' module to create URI object
    return url.parse(uri);
}

/**
 * Append map as parameters to URL
 *
 * @param {Map} map
 * @param {String} uri - the current uri
 * @returns {String} uri
 */
var _appendMapToQueryString = function(uri, map) {
    for (var key in map) {
        uri = _appendQueryString(uri, key, map[key]);
    }

    return uri;
};

/**
 * Append a key and value as a parameter to the uri
 *
 * @param {String} uri
 * @param {String} key
 * @param {Object} value
 * @returns {string|*}
 * @private
 */
var _appendQueryString = function(uri, key, value) {
    if (uri.indexOf("?") == -1) {
        uri += "?";
    }

    if (uri.indexOf("?") != uri.length - 1) {
        uri += "&";
    }

    uri += key + "=" + value;

    return uri;
};


/**
 * Function to construct the options map needed for the API request.
 *
 * @param {String} httpMethod - The type of HTTP request being made e.g. 'POST'
 * @param {Object} uri - An object containing the properties of a URI
 * @param {String} authHeader - String containing Authorization header data
 *
 * @returns {{host: (string|string), port: *, path: *, method: *, headers: {Accept: string, Authorization: *, Content-Type: string, User-Agent: string}}}
 */
function getRequestOptions(httpMethod, uri, authHeader) {

    return {
        host: uri.hostname,
        port: uri.port,
        path: uri.path,
        method: httpMethod,
        headers: {
            "Accept": "application/json",
            "Authorization": authHeader,
            "Content-Type": "application/json",
            "User-Agent": "NodeJS-SDK"
        }
    };
}

/**
 * Function to choose the appropriate HTTP method based on the API action.
 *
 * @param {String} action - The type of action being invoked on the domain object
 * @return {String} Returns a HTTP request type e.g. 'POST'
 */
function getHttpMethod(action) {
    var httpMethod;

    if (action === "create") {
        httpMethod = "POST";
    }
    else if (action === "delete") {
        httpMethod = "DELETE";
    }
    else if (action === "update") {
        httpMethod = "PUT";
    }
    else if (action === "read" || action === "list") {
        httpMethod = "GET";
    }

    return httpMethod;
}

MasterCardAPI.OAuth = oauth;

// Export our object for use.
module.exports = MasterCardAPI;
