/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @file Todo
 *
 * @example Todo
 *
 */

    // app/models/user.js
    // load the things we need
var bcrypt   = require( 'bcrypt-nodejs' )

module.exports = function ( mongoose ) {

    // define the schema for our user model
    var userSchema = mongoose.Schema( {

        local:    {
            email:    String,
            password: String,
        },
        facebook: {
            id:    String,
            token: String,
            name:  String,
            email: String
        },
        twitter:  {
            id:          String,
            token:       String,
            displayName: String,
            username:    String
        },
        google:   {
            id:    String,
            token: String,
            email: String,
            name:  String
        }

    } );

    // methods ======================
    // generating a hash
    userSchema.methods.generateHash = function ( password ) {
        return bcrypt.hashSync( password, bcrypt.genSaltSync( 8 ), null );
    };

    // checking if password is valid
    userSchema.methods.validPassword = function ( password ) {
        return bcrypt.compareSync( password, this.local.password );
    };

    mongoose.model( 'User', userSchema )

    return mongoose

}
