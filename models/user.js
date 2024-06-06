const mongoose = require( 'mongoose' );
const bcryptjs = require( 'bcryptjs' );

const userSchema = new mongoose.Schema( {
    name: String,
    email: String,
    password: String,
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    }
} );

const userModel = mongoose.model( 'user', userSchema );

userModel.hashPassword = ( password ) => {
    return bcryptjs.hashSync( password, 10 );
};

userModel.comparePassword = ( password, hashPassword ) => {
    return bcryptjs.compareSync( password, hashPassword );
};

module.exports = userModel;
