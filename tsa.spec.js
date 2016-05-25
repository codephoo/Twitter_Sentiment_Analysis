describe("validate input from user", function(){
  it("should return a string", function(){
    let tweets= new FetchTweets('shawlhar');
    expect(typeof tweets.username).toBe(typeof '');
  });
  it("should be greater than 0", function(){
    let tweets= new FetchTweets('shawlhar');
    expect(tweets.username.length).not.toBeLessThan(0);
  });
  it("should return Enter a Username", function(){
    expect(function(){new FetchTweets('');}).toBe("Enter a Username");
  });
  it("should return Enter a Username", function(){
    expect(function(){tweets()}).toBe("Enter a Username");
  });
});
