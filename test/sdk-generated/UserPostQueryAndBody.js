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

var MasterCardAPI = require('../../index');
var UserPostQueryAndBody = {};

    /**
     * Private function to resolve the ResourcePath
     * @returns String of the path of the resource
     * @private
     */
    var _getResourcePath = function(action) {
    
        if (action == "create") {
            return "/mock_crud_server/posts";
        }
        throw "Error: path not found for action '"+action+"'";
    };


    /**
     * Private function to get list of Header Parameter
     * @returns
     * @private
     */
    var _getHeaderList = function(action) {
    
        if (action == "create") {
           return [];
        }
        return [];
    };

    /**
     * Private function to get list of Header Parameter
     * @returns
     * @private
     */
    var _getQueryList = function(action) {

        if (action == "create") {
           return [ 'query-param' ];
        }
        return [];
    };




    
    /**
     * Function to retrieve a list UserPostQueryAndBody objects.
     *
     * @method list
     * @param {Object} params - A map of parameters in which to define the UserPostQueryAndBody list from.<br/><br/>
     * @param {Function} callback A function to handle success/error responses from the API.<br/>
     * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
     */
    UserPostQueryAndBody.create = function(params, callback) {
        if (!MasterCardAPI.isSet(params)) {
            params = {};
        }

        MasterCardAPI.execute({
            action: "create",
            path: _getResourcePath("create"),
            headerList: _getHeaderList("create"),
            queryList: _getQueryList("create"),
            params: params
        }, callback);
    };




module.exports = UserPostQueryAndBody;