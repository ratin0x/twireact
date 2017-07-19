/**
 * Created by rat on 17/07/17.
 */
module.exports = function (request, reply) {

    const RATE_LIMIT = 61000;

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

    var param = request.payload;

    var ret;
    var params = {screen_name: param.name};

    var friendList = [];
    var circleList = [];


    client.get('friends/ids', params, function(error, friends, response) {
        if (!error) {
            console.log(friends);
            friendList = friends.ids;

            for ( var i = 0; i < friendList.length; i++ ) {
                var id = JSON.parse( JSON.stringify(friendList[i]));
                console.log( "Getting friends for id ", id);
                setTimeout( function(id) {
                    getFriendsForUser(id);
                }, RATE_LIMIT * ( i + 1 ), id );

            }

            reply( { status: 200, circle: circleList });
        } else {
            console.log( 'Error: ', error );
            reply( error );
        }
    });

    function getFriendsForUser( id ) {
        params = {};
        params.user_id = id;

        client.get('friends/ids', params, function (error, friends, response) {
            if (!error) {
                for ( var i = 0; i < friends.ids.length; i++ ) {
                    var friend = friends.ids[i];
                    if ( friendList.indexOf( friend ) != -1 ) {
                        circleList.push( friend );
                    }
                }
                console.log(JSON.stringify(friends));
            } else {
                console.log('Error : ', error);
                // reply(error);
            }
        });
    }

};
