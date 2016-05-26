#! /usr/bin/env node
'use strict';
let request=require('request');
let username ='', api='';
let r1= require('readline');
let read=r1.createInterface({
  input:process.stdin,
  output:process.stdout
});
read.question("What is your twitter username \n", function(ans){
  username =ans;
  read.close();
  let tweets =new FetchTweets(ans);
  //api =+username;
  tweets.performRequest();
})
let userTweets='';
let options={
  uri: 'https://api.twitter.com/1.1/statuses/user_timeline.json?count=20&screen_name=',
oauth:{
  consumer_secret:'ASYgVNsunwHzdYARQrau2br38xvkfTTqoWb0WSz7vSTfpJsn87',
consumer_key:"Q1mgrdKQZfrKlcuFelNun7KCT",
oauth_token:"176088436-4lSOAAl0syOqIlmog586qYlyFxnwzxJmQP1NZj0Y",
}
}
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
        result.forEach(function(currentTweet){
          userTweets+=currentTweet.text+' ';
        });
        console.log(new WordFrequency(userTweets));
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
class WordFrequency{
  constructor (tweet){
  let tweetLowerCase = tweet.toLowerCase().trim().replace(/[,;.]/g,'').split(/[\s\/]+/g).sort();
  let wordCount = tweetLowerCase.length; // count w/ duplicates
  // array of words to ignore
  let ignore = ['and','the','to','a','of','for','as','i','with','it','is','on'
  ,'that','this','can','in','be','has','if','https','http'];
  ignore = (function(){
  let o = {}; // object prop checking > in array checking
  let ignoreLength = ignore.length;
  for (let i=0;i<ignoreLength;i++){
    o[ignore[i]] = true;
  }
  return o;
  }());
  let counts = {}; // object for math
  for (let i=0; i<wordCount; i++) {
    let sWord = tweetLowerCase[i];
    if (!ignore[sWord]) {
      counts[sWord] = counts[sWord] || 0;
      counts[sWord]++;
    }
  }
  
  let arr = []; // an array of objects to return
  for (var sWord in counts) {
    arr.push({
      text: sWord,
      frequency: counts[sWord]
    });
  }
  // sort array by descending frequency | http://stackoverflow.com/a/8837505
  return arr.sort(function(a,b){
    return (a.frequency > b.frequency) ? -1 : ((a.frequency < b.frequency) ? 1 : 0);
  });
}
wordCounter() {
let wordCount = words.length; // count w/o duplicates
for (let i=0; i<wordCount; i++) {
  let word = words[i];
  console.log(word.frequency, word.text);
};
}
}

let AlchemiAPIKey={
  "credentials": {
    "url": "https://gateway-a.watsonplatform.net/calls",
    "note": "It may take up to 5 minutes for this key to become active",
    "apikey": "1131bac568b9396ac06c0cd785047a25bc313839"
  }
};