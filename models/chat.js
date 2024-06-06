const mongoose = require( 'mongoose' );

const chatSchema = new mongoose.Schema( {
    message: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    }
} );

const chatModel = mongoose.model( 'chat', chatSchema );

module.exports = chatModel;
