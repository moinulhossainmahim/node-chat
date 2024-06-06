const auth = ( req, res, next ) => {
    if ( req.user ) {
        return next();
    }
    req.flash( 'error', 'You are not logged in.' );
    res.redirect( '/login' );
};

module.exports = auth;
