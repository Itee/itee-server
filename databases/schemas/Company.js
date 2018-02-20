/**
 * @file Todo
 *
 * @author Itee <valcketristan@gmail.com>
 * @license MIT
 */

module.exports = function ( mongoose ) {

    const schemaTypes = mongoose.Schema.Types

    const CompanySchema = mongoose.Schema( {
        name:        String,
        sites:       [ schemaTypes.ObjectId ]
    } )

    mongoose.model( 'Company', CompanySchema )

    return mongoose

}
