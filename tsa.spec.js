describe("validate input from user", () =>{
  it("should return a string", () =>{
    let tweets= new FetchTweets('shawlhar');
    expect(typeof tweets.username).toBe(typeof '');
  });
  it("should be greater than 0", () => {
    let tweets= new FetchTweets('shawlhar');
    expect(tweets.username.length).not.toBeLessThan(0);
  });
  it("should return Enter a Username", () => {
    expect(()=>{new FetchTweets('');}).toBe("Enter a Username");
  });
  it("should return Enter a Username", () =>{
    expect(()=>{tweets()}).toBe("Enter a Username");
  });
});
describe("connect to Twitter API", () => {
  it("return a JSON object", () =>{
    let tweets= new FetchTweets('shawlhar');
    expect(tweets.getTweets(screen_name)).toBe(typeof {});
  });
  it('should return protected tweets',() =>{
    let tweets= new FetchTweets('shawlhar')
    expect(tweets.out_of_bound).toBe('Hold up, those are protected tweets.');
  });
  it("return Username not found", () => {
    let tweets= new FetchTweets('Non existing Username')
    expect(new tweets.getTweets()).toBe("Username not found");
  });
  it('return User has no tweets', () =>{
    let tweets= new FetchTweets('sjsdfds')
    expect(tweets.getTweets()).toBe("User has no tweets"));
  });
});