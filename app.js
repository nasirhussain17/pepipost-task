'use strict'
const request = require('request');
const fs = require("fs");
const _configuration = require("./config/config")
const _baseUri = _configuration.BASEURI;
const helper = require('./helper');
const _pathUrl = '/mail/send';
const _queryBuilder = `${_baseUri}${_pathUrl}`;
const users = require('./users');



// validate and preprocess url
const _queryUrl = helper.cleanUrl(_queryBuilder);

// prepare headers
const _headers = {
    'content-type': 'application/json; charset=utf-8',
    api_key: _configuration.apiKey,
};

var arr= [];
users.map((user)=>{
  let id = user.Id
  let body={
    "from": {
      "email": "info@tagnpin.com",
      "name": "Lesley Knope"
    },
    "subject": "Tribute to Lil'Sebastian",
    "template_id": 0,
    "content": [
      {
        "type": "html",
        "value": "[%LEAD%] & [%BAND%] will be singing a tribute song for our Lil'Sebastian."
      }
    ],
    "personalizations": [
      {
        "attributes": {
          "LEAD": "Andy Dwyer",
          "BAND": "Mouse Rat"
        },
        "to": [
          {
            "email": user.email,
            "name": user.name
          }
        ],
      }
    ],

    
  }

// construct the request

const _options = {
    url: _queryUrl,
    method: 'POST',
    headers: _headers,
    body: helper.jsonSerialize(body),
};

request(_options,function (error, response, body) {

  if (response.statusCode >= 200 && response.statusCode <= 206){
    
    let r = JSON.parse(body)
    r.user_id = id;
    arr.push(r)
   let res = JSON.stringify(arr,null,2)
    
   fs.writeFileSync('res.json',res,function(err) {
       if (err) {
          return console.error(err);
       }})
   
   }else{
    let err = JSON.stringify(error);
    fs.writeFileSync('err.json',err,function(err) {
        if (err) {
           return console.error(err);
        }})
   }
 
});
})

