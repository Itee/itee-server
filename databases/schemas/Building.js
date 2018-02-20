/**
 * @file Todo
 *
 * @author Itee <valcketristan@gmail.com>
 * @license MIT
 */

module.exports = function ( mongoose ) {

    const schemaTypes = mongoose.Schema.Types

    const BuildingSchema = mongoose.Schema( {
        gmaoId: String,
        name:   String,
        site:   schemaTypes.ObjectId,
        scenes: [ schemaTypes.ObjectId ],
        meshes: [ schemaTypes.ObjectId ]
    } )

    mongoose.model( 'Building', BuildingSchema )

    return mongoose

}
