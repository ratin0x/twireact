/**
 * Created by rat on 17/07/17.
 */
module.exports = function (request, reply) {
    var context = {
        pageTitle: 'Main'
    };

    reply.file( 'public/index.html' );
};
