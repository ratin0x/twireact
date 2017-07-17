/**
 * Created by rat on 17/07/17.
 */
module.exports = function (request, reply) {
    var context = {
        pageTitle: 'Search'
    };

    var Twitter = require('twitter');

    var client = new Twitter({
        consumer_key: 'QhlraziZ4px2EYecH8VfHRi3J',
        consumer_secret: 'MpHKZs179UN8rRuHBB591aU0X6A8WtVW6KFPK20gBk4RE9Nszb',
        access_token_key: '26381740-DNsTTkamwWSl0FsmxBU5jKQn5g0C204JYhPoPbbBc',
        access_token_secret: 'vLvfoHJ7QjQmEbyg8o9t5avP9vXQ1DGoZVACEc2TthdI9'
    });

    var tweetList;

    var params = {screen_name: 'nodejs'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log(tweets);
            tweetList = tweets;
        } else {
            console.log( 'Error' );
        }
    });

    var param = request.payload;

    console.log(param);

    reply( "Search for " + param.name );
};
