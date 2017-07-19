var Hapi = require('hapi');
var Glue = require('glue');
var Path = require('path');
var Hoek = require('hoek');

//This manifest describes our user modules
var manifest = require('./config/manifest.json');

//We use this object to provide the path to user modules
var options = {
    relativeTo: __dirname + '/lib/modules'
};

Glue.compose( manifest, options, function( err, server ) {
    //Wiring for the template engine
    server.register( require('vision'), function(err) {
        Hoek.assert(!err,err);

        server.views({
            engines: {
                html: require('handlebars')
            },
            relativeTo: __dirname,
            path: 'templates'
        });
    });

    //Wiring for static content
    server.register( require('inert'), function(err) {
        server.route({
            path: '/dist/public/js/{param*}',
            method: 'GET',
            handler: {
                directory: {
                    path: 'public/js'
                }
            }
        });
    });

    server.register( require('inert'), function(err) {
        server.route({
            path: '/public/{param*}',
            method: 'GET',
            handler: {
                directory: {
                    path: 'public'
                }
            }
        });
    });

    //Start the server!
    server.start( function(err) {
        //API on port 8042
    });
});