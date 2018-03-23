/**
 * @file Todo
 *
 * @author Itee <valcketristan@gmail.com>
 * @license MIT
 */

module.exports = function ( Mongoose ) {

    const Schema = Mongoose.Schema
    const Types  = Schema.Types

    Mongoose.model( 'Company', new Schema( {
        name:  String,
        type:  String,
        sites: [ Types.ObjectId ]
    } ) )

    return Mongoose

}
