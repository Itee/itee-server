/**
 * @file Todo
 *
 * @author Itee <valcketristan@gmail.com>
 * @license MIT
 */

module.exports = function ( mongoose ) {

    const schemaTypes = mongoose.Schema.Types

    const SiteSchema = mongoose.Schema( {
        uuid:      String,
        name:      String,
        company:   schemaTypes.ObjectId,
        buildings: [ schemaTypes.ObjectId ]
    } )

    mongoose.model( 'Site', SiteSchema )

    return mongoose

}
