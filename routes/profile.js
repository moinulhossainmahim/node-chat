const express = require( 'express' );
const router = express.Router();
const profileController = require( './../controllers/profile' );
const authMiddleware = require( './../middlewares/auth' );

router.get( '/show', authMiddleware, profileController.show );

router.get( '/edit', authMiddleware, profileController.edit );

router.put( '/update', authMiddleware, profileController.update );

module.exports = router;
