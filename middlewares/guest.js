const guest = ( req, res, next ) => {
    if ( !req.user ) {
        return next();
    }
    req.flash( 'error', 'You are already logged in.' );
    res.redirect( '/' );
};

module.exports = guest;
