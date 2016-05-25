describe("validate input from user", function(){
	it("return a string", function(){
		var tweets= new FetchTweets('shawlhar');
		expect(typeof tweets.username).toBe(typeof '');
	});
	it("should be greater than 0", function(){
		var tweets= new FetchTweets('shawlhar');
		expect(tweets.username.length).not.toBeLessThan(0);
	});
	it("return Enter a Username", function(){
		expect(function(){new FetchTweets('');}).toBe("Enter a Username");
	});
	it("return Enter a Username", function(){
		expect(function(){tweets()}).toBe("Enter a Username");
	});
});
