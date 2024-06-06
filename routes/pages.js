const express = require( 'express' );
const router = express.Router();
const pagesController = require( '../controllers/pages' );
const authMiddleware = require( './../middlewares/auth' );

router.get( '/', pagesController.home );
router.get( '/chat', authMiddleware, pagesController.chat );

module.exports = router;
