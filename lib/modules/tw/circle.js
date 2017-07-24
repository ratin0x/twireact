/**
 * Created by rat on 17/07/17.
 */
module.exports = function (request, reply) {

    const RATE_LIMIT = 61000;

    var fs = require('fs');
    var jsonfile = require('jsonfile');

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

    var file = 'data/' + param.name + '.json';

    var friendList = [];
    var followerList = [];
    var circleList = [];
    var cycleCount = 0;
    var maxCycles;

    client.get('followers/ids', params, function(error, followers, response) {
        if (!error) {
            console.log(followers);
            followerList = followers.ids;

            client.get('friends/ids', params, function (error, friends, response) {
                if (!error) {
                    console.log(friends);
                    friendList = friends.ids;
                    maxCycles = friendList.length;

                    var count = 0;
                    for (var i = 0; i < friendList.length; i++) {
                        var id = JSON.parse(JSON.stringify(friendList[i]));

                        if ( friendList.indexOf(id) != -1 && followerList.indexOf(id) != -1 ) {
                            console.log( "Getting friends for id ", id);
                            circleList.push( id );
                            count += 1;
                            setTimeout(function (id) {
                                getFriendsForUser(id);
                            }, (RATE_LIMIT * count), id);
                        }
                    }

                    reply({status: 200});

                } else {
                    console.log('Error: ', error);
                    reply(error);
                }
            });

        } else {
            console.log( 'Error: ', error );
            reply( error );
        }
    });

    function getFriendsForUser( id ) {
        console.log( 'Getting friends for ', id);
        params = {};
        params.user_id = id;
        var output = {};

        client.get('friends/ids', params, function (error, friends, response) {
            if (!error) {
                for ( var i = 0; i < friends.ids.length; i++ ) {
                    var friend = friends.ids[i];
                    if ( friendList.indexOf( friend ) != -1 && followerList.indexOf(friend) != -1 ) {
                        circleList.push( friend );
                        output.circleList = circleList;
                        if ( fs.existsSync(file)) {
                            oldOutput = jsonfile.readFileSync( file );
                            oldOutput.circleList =  output.circleList;
                            jsonfile.writeFileSync( file, oldOutput );
                        } else {
                            jsonfile.writeFileSync( file, output );
                        }
                    }
                }
                console.log(JSON.stringify(friends));
                cycleCount += 1;

                if ( cycleCount >= maxCycles ) {
                    //Mark job as done
                    output.circleList = circleList;

                    if ( fs.existsSync(file)) {
                        oldOutput = jsonfile.readFileSync( file );
                        oldOutput.circleList =  output.circleList;
                        jsonfile.writeFileSync( file, oldOutput );
                    } else {
                        jsonfile.writeFileSync( file, output );
                    }
                }
            } else {
                console.log('Error : ', error);
                // reply(error);
            }
        });
    }

};
