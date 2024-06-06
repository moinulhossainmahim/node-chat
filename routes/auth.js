const express = require( 'express' );
const router = express.Router();
const authController = require( './../controllers/auth' );
const passport = require( 'passport' );
const authMiddleware = require( './../middlewares/auth' );
const guestMiddleware = require( './../middlewares/guest' );

router.route( '/register' )
    .get( guestMiddleware, authController.register )
    .post( guestMiddleware, authController._register );

router.route( '/login' )
    .get( guestMiddleware, authController.login )
    .post(
        guestMiddleware,
        passport.authenticate( 'local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true,
        } )
    );

router.get( '/logout', authMiddleware, authController.logout );

module.exports = router;
