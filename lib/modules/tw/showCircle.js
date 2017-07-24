/**
 * Created by rat on 20/07/17.
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
    var circle;
    var params = {};

    var file = 'data/' + param.name + '.json';

    if ( fs.existsSync(file)) {
        circle = jsonfile.readFileSync( file );

        var rqParam = '';

        for ( var i = 0; i < circle.circleList.length; i++ ) {
            rqParam += circle.circleList[i] + ',';
        }

        rqParam = rqParam.substr(0, rqParam.length - 1 );

        params.user_id = rqParam;

        // reply({ status: 200, circle: circle.circleList });

        client.post('users/lookup', params, function(error, users, response) {
            if (!error) {
                console.log(users);

                reply({ status: 200, circle: users });

            } else {
                console.log( 'Error: ', error );
                reply( error );
            }
        });

    } else {
        reply( {status: 404});
    }

};
