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
  tweets._performRequest();
})
let userTweets='';
let options={
  uri: 'https://api.twitter.com/1.1/statuses/user_timeline.json?count=10&screen_name=',
oauth:{
  consumer_secret:'ASYgVNsunwHzdYARQrau2br38xvkfTTqoWb0WSz7vSTfpJsn87',
consumer_key:"Q1mgrdKQZfrKlcuFelNun7KCT",
oauth_token:"176088436-4lSOAAl0syOqIlmog586qYlyFxnwzxJmQP1NZj0Y",
}
}

/* Class to verify inputted username and fetch user tweets*/
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
  /*Takes in a username and attempt to fetch the tweets for the
  username using twitter API
  */
  _performRequest() {
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
        let words=new WordFrequency(userTweets);
        console.log(words._wordCounter());
        request.post('http://gateway-a.watsonplatform.net/calls/text/TextGetEmotion', 
          {form:{apikey:'1131bac568b9396ac06c0cd785047a25bc313839',outputMode:'json',
          text:userTweets}}, function(error,response,body){
            if(!error){
              let result = JSON.parse(body);
              let x=0;
              let userEmo=''
              for(var emo in result['docEmotions']){
                if(result['docEmotions'][emo]>x){
                  x= result['docEmotions'][emo];
                  userEmo=emo;
                }
              }
              console.log(result['docEmotions']);
              console.log('User has a high level of '+userEmo);
            }
            else{
              return 'Try again';
            }
        })
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
/* Class to implement word frequency analysis
takes in a tweet and returns the frequency of 
words in th tweet
*/
class WordFrequency{
  constructor (tweet){
  let _tweetLowerCase = tweet.toLowerCase().trim().replace(/[,;.]/g,'').split(/[\s\/]+/g).sort();
  let _wordCount = _tweetLowerCase.length; // count w/ duplicates
  let _ignore = ['and','the','to','a','of','for','as','i','with','it','is','on'
  ,'that','this','can','in','be','has','if','https','http'];
  _ignore = (function(){
  let o = {};
  let ignoreLength = _ignore.length;
  for (let i=0;i<ignoreLength;i++){
    o[_ignore[i]] = true;
  }
  return o;
  }());
  let _counts = {};
  for (let i=0; i<_wordCount; i++) {
    let sWord = _tweetLowerCase[i];
    if (!_ignore[sWord]) {
      _counts[sWord] = _counts[sWord] || 0;
      _counts[sWord]++;
    }
  }
  let _arr = []; 
  for (var sWord in _counts) {
    _arr.push({
      text: sWord,
      frequency: _counts[sWord]
    });
  }
  this.words= _arr.sort(function(a,b){
    return (a.frequency > b.frequency) ? -1 : ((a.frequency < b.frequency) ? 1 : 0);
  });
}
_wordCounter() {
let wordCount = this.words.length; 
for (let i=0; i<wordCount; i++) {
  let word = this.words[i];
  console.log(word.frequency, word.text);
};
return '';
}
}

