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
        name:     String,
        sites: [ Types.ObjectId ]
    } ) )

//    const CompanyModel = Mongoose.model( 'Companies', new Schema( {
//        name:     String,
//        type:     String,
//        sites: [ Types.ObjectId ]
//    }, {
//        discriminatorKey: 'type'
//    } ) )
//
//    CompanyModel.discriminator( 'Company', new Schema( {} ) )
//
//    CompanyModel.discriminator( 'FooCompany', new Schema( {
//        foo: String
//    } ) )
//
//    CompanyModel.discriminator( 'BarCompany', new Schema( {
//        bar: String
//    } ) )

    return Mongoose

}
