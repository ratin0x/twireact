exports.register = function(server, options, next) {
    server.route({
        path: '/tw',
        method: 'GET',
        handler: require('./main')
    });

    server.route({
        path: '/tw/searchUser',
        method: 'POST',
        handler: require( './searchUser')
    });

    server.route({
        path: '/tw/circle',
        method: 'POST',
        handler: require( './circle')
    });

    // server.route({
    //     path: '/main/list',
    //     method: 'GET',
    //     handler: require('./list')
    // });
    //
    // server.route({
    //     path: '/main/get/{hash}',
    //     method: 'GET',
    //     handler: require('./get')
    // });
    //
    // server.route({
    //     path: '/main/create/{name}',
    //     method: 'GET',
    //     handler: require('./create')
    // });
    //
    // server.route({
    //     path: '/main/validate/{param?}',
    //     method: 'GET',
    //     handler: require('./validate')
    // });

    next();

};

exports.register.attributes = {
    pkg: require('./package.json')
};
