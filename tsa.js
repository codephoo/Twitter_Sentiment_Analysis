#! /usr/bin/env node
'use strict';
let request=require('request'),let r1= require('readline');
let username ='', api='';
let read=r1.createInterface({
  input:process.stdin,
  output:process.stdout
});
read.question("What is your twitter username \n", function(ans){
  username =ans;
  read.close();
  let tweets =new FetchTweets(ans);
  tweets.performRequest();
})
class FetchTweets{
  constructor(username){
    let self= this;
    let verifyName = function(username){
      if(typeof username !== typeof '' || username==='' || username ===undefined){
        throw new Error("Invalid Username");
      }
      else{
        self.username = String(username);
      }
    };
    try{verifyName(username)} catch(e){console.log(e)};
  }
  performRequest(username) {
  options.uri+=this.username;
  request(options, function (error, response, body) {
    body=JSON.parse(body);
  if (!error ) {
    if(response.statusCode===404){
      if(body.errors[0].code===34){
        console.log('Username not Found');
      }
      else{
        console.log("Page not found");
      }
    }
    if(response.statusCode===200){
      if(body.length===0){
        console.log("User has no tweet");
      }
      else{
        let result=body;
        userTweets=result[0].text;console.log(result[1].text);
      }
    }
    if(response.statusCode===401){
      console.log('You are not authorized')
    }
  }
  else{
    console.log(response);
  }
})
}
}
