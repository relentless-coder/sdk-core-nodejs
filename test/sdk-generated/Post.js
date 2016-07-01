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
var Post = {};

    /**
     * Private function to resolve the ResourcePath
     * @returns String of the path of the resource
     * @private
     */
    var _getResourcePath = function(action) {
    
         if (action == "list") {
           return "/mock_crud_server/posts";
        }
        if (action == "create") {
            return "/mock_crud_server/posts";
        }
        if (action == "read") {
            return "/mock_crud_server/posts/{id}";
        }
        if (action == "query") {
            return "/mock_crud_server/posts/{id}";
        }
        if (action == "update") {
            return "/mock_crud_server/posts/{id}";
        }
        if (action == "delete") {
            return "/mock_crud_server/posts/{id}";
        }
        throw "Error: path not found for action '"+action+"'";
    };


    /**
     * Private function to get list of Header Parameter
     * @returns
     * @private
     */
    var _getHeaderList = function(action) {
    
        if (action == "list") {
           return [];
        }
        if (action == "create") {
            return [];
        }
        if (action == "read") {
            return [];
        }
        if (action == "query") {
            return [];
        }
        if (action == "update") {
            return [];
        }
        if (action == "delete") {
            return [];
        }
        return [];
    };




    
    /**
     * Function to retrieve a list Post objects.
     *
     * @method list
     * @param {Object} params - A map of parameters in which to define the Post list from.<br/><br/>
     * @param {Function} callback A function to handle success/error responses from the API.<br/>
     * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
     */
    Post.list = function(params, callback) {
        if (!MasterCardAPI.isSet(params)) {
            params = {};
        }

        MasterCardAPI.execute({
            action: "list",
            path: _getResourcePath("list"),
            headerList: _getHeaderList("list"),
            params: params
        }, callback);
    };
    
    
    
    
    //test query
    Post.query = function(params, callback) {
        if (!MasterCardAPI.isSet(params)) {
            params = {};
        }

        MasterCardAPI.execute({
            action: "query",
            path: _getResourcePath("query"),
            headerList: _getHeaderList("query"),
            params: params
        }, callback);
    };



    
    /**
     * Function to create a Post object.
     *
     * @method create
     * @param {Object} params - A map of parameters in which to create the Post from.<br/><br/>
     * @param {Function} callback - A function to handle success/error responses from the API.<br/>
     * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
     */
    Post.create = function(params, callback) {
        MasterCardAPI.execute({
            action: "create",
            path: _getResourcePath("create"),
            headerList: _getHeaderList("create"),
            params: params
        }, callback);
    };








    
    /**
     * Function to retrieve a Post object from the API.
     *
     * @method find
     * @param {String} id - The ID of the Post to retrieve
     * @param {Object} query - A map of parameters in which to create the Post from.<br/><br/>
     * @param {Function} callback - A function to handle success/error responses from the API.<br/>
     * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
     */
    Post.read = function(id, query, callback) {
        var params = MasterCardAPI.isSet(query) ? query : {};
        params.id = id;

        MasterCardAPI.execute({
            action: "read",
            path: _getResourcePath("read"),
            headerList: _getHeaderList("read"),
            params: params
        }, callback);
    };

    
    /**
     * Function to update a Post object.
     *
     * @method update
     * @param {Object} params - A map of parameters on which to update the Post object.<br/><br/>
     * @param {Function} callback - A function to handle success/error responses from the API.<br/>
     * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
     */
    Post.update = function(params, callback) {
        MasterCardAPI.execute({
            action: "update",
            path: _getResourcePath("update"),
            headerList: _getHeaderList("update"),
            params: params
        }, callback);
    };







    
    /**
     * Function to delete a Post object.
     *
     * @method delete
     * @param {String} id - A string ID of the Post to delete.
     * @param {Function} callback - A function to handle success/error responses from the API.<br/>
     * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
     */
    Post.delete = function(id, callback) {
        MasterCardAPI.execute({
            action: "delete",
            path: _getResourcePath("delete"),
            headerList: _getHeaderList("delete"),
            params: { id: id }
        }, callback);
    };


module.exports = Post;