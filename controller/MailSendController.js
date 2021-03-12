const request = require('request');
const fs = require("fs");
const _configuration = require("../config/config")
const _baseUri = _configuration.BASEURI;
const helper = require('../Helper/helper');



function createGeneratethemailsendrequest(body) 
{
    const _pathUrl = '/mail/send';
    const _queryBuilder = `${_baseUri}${_pathUrl}`;
        // validate and preprocess url
        const _queryUrl = helper.cleanUrl(_queryBuilder);
       

        // prepare headers
        const _headers = {
            'content-type': 'application/json; charset=utf-8',
            api_key: _configuration.apiKey,
        };


        const _options = {
        url: _queryUrl,
        method: 'POST',
        headers: _headers,
        body: helper.jsonSerialize(body),
        };

    
         request(_options,function (error, response, body) {

        if (response.statusCode >= 200 && response.statusCode <= 206){
          let r = JSON.parse(body)
          let res = JSON.stringify(r,null,2)
          console.log(res);
         fs.writeFileSync('res.json',res,function(err) {
             if (err) {
                return console.error(err);
             }})
         
         }else{
          let err = JSON.stringify(error);
          fs.writeFileSync('err.json',err,function(err) {
              if (err) {
                 return console.log(err);
              }})
         }
        
        });
}

module.exports = createGeneratethemailsendrequest;