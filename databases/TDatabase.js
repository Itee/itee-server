/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @module TDatabase
 *
 * @description This module manage the mongoose database driver extention.
 * It will extend with external plugins (like 'mongoose-double'),
 * local schema and finally apply the ReconnectDatabase module.
 *
 */
const mongooseDouble = require( 'mongoose-double' )
const autoReconnect  = require( './TAutoReconnect' )
let mongoose         = require( 'mongoose' )

/**
 * This module manage the mongoose database driver extention.
 * It will extend with external plugins (like 'mongoose-double'),
 * local schema and finally apply the ReconnectDatabase module.
 *
 * @param mongoose - The mongoose driver database to extend
 * @returns {*} - The extended mongoose driver
 */
module.exports = function ( config ) {

    /*
     * IMPORT MONGOOSE PLUGINS
     */
    mongooseDouble( mongoose )

    /*
     * REGISTER DATABASE SCHEMAS
     */
    const schemaNames    = config.schemas
    const numberOfSchema = schemaNames.length
    let i

    // TODO RECUSIF FOLDER
    for ( i = 0 ; i < numberOfSchema ; ++i ) {
        console.log( 'Register schema: ' + schemaNames[ i ] )
        mongoose = require( './schemas/' + schemaNames[ i ] )( mongoose )
    }

    /*
     * DATABASE CONNECTION
     */
    mongoose = autoReconnect( mongoose, config )

    return mongoose
}
