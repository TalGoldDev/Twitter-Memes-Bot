
console.log("the bot is starting");

//importing twit package.
var Twit = require('twit');

//importing twitter authentication info.
var config = require('./config');

// authenticating the account with twitter using config.
var T = new Twit(config);

// defining the source of our user content.
var params = {
	q:'theMemesBot',
	count:1
}
var params2 = {
	q:'FreeMemesKids',
	count:1
}
var params3 = {
	q:'9gag',
	count:1
}

var arrayAccounts = [params, params2, params3];

// Once every N milliseconds
setInterval(tweet, 60*60*1000);

function tweet(){
	// choosing which account to draw content from.
	var draw = Math.floor((Math.random() * 3));

	T.get('search/tweets', arrayAccounts[draw], gotData);
	function gotData(err, data, response) {
		var statusID = '';
		var tweets = data.statuses;
		for (var i = 0; i < tweets.length; i++) {

			console.log(tweets[i].text);
			statusID = tweets[i].id_str;

			console.log('id: ' + statusID);
			T.post('statuses/retweet/:id', { id: statusID }, function (err, data, response) {
	      	console.log('Success: ' + data.text);
			})
	}

	}
}

