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
  * This parse a list from list.
  * @param {type} list
  * @returns {Array|nm$_error.parseList.result|parseList.result}
  */
const parseList = function(list) {
     const result = [];
     list.forEach((el, i)=>{
       let item = el;
       if(item instanceof Array){
         result.push(parseList(item))
       } else if(item instanceof Object){
         result.push(parseMap(item))
       } else {
         result.push(item)
       }
     })
     return result;
 }

 /**
  * This is the private function which re-parsed the map and makes it case-insensitive
  * @param {type} map
  * @returns {unresolved}
  */
const parseMap = function(map) {
     const result = {};
     for (let key in map) {
         let tmpObject = map[key];
         if (tmpObject instanceof Array) {
             result[key.toString().toLowerCase()] = parseList(tmpObject);
         } else if ( tmpObject instanceof Object) {
             result[key.toString().toLowerCase()] = parseMap(tmpObject);
         } else {
             result[key.toLowerCase()] = tmpObject;
         }
     }
     return result;
 }

/**
 * const getErrorObject - description
 *
 * @param  {type} caseSensitiveMap description
 * @return {type}                  description
 */
const getErrorObject = function(caseSensitiveMap) {
     if ("errors" in caseSensitiveMap) {
         let object = caseSensitiveMap["errors"];

         if ("error" in object) {
             object = object["error"];
         }

         if (object instanceof Array) {
             return object[0];
         }

         return object;
     } else {
         return {};
     }
 }


/**
  * Error object for any API related issues.
*/

class APIError {
  constructor(msg, payload, status) {
    this.type = "APIError";
    this.message = msg;
    this.rawErrorData = payload;
    this.httpStatus = status;
    this._errorObject = getErrorObject(parseMap(payload))
  }
  getReasonCode() {
      if ("reasoncode" in this._errorObject) {
          return this._errorObject["reasoncode"];
      }
  }
  getMessage() {
      if ("description" in this._errorObject) {
          return this._errorObject["description"];
      } else {
          return this.message;
      }
  }
  getSource() {
      if ("source" in this._errorObject) {
          return this._errorObject["source"];
      }
  }
  getHttpStatus() {
      return this.httpStatus;
  };
}

/**
 * Error object for any SDK related issues.
 */
const SDKError = function (msg) {
    this.type = "SDKError";
    this.message = msg;
};

module.exports = {
    APIError: APIError,
    SDKError: SDKError
};
