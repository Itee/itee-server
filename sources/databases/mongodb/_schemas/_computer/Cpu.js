/**
 * Created by tvalcke on 26/11/2015.
 */

const Core = require( './Core' )

let _schema = undefined

function getSchemaFrom ( Mongoose ) {
    'use strict'

    if ( !_schema ) {
        _createSchema( Mongoose )
    }

    return _schema

}

function _createSchema ( Mongoose ) {
    'use strict'

    const CoreSchema = Core.getSchemaFrom( Mongoose )
    const Schema     = Mongoose.Schema

    _schema = new Schema( {
        name:  {
            type:    String,
            trim:    true,
            default: 'CpuDefaultName'
        },
        usage: {
            type:     Number,
            default:  0,
            min:      0,
            max:      100,
            validate: [
                cpuUsage => (cpuUsage >= 0 && cpuUsage <= 100),
                'La valeur "{VALUE}" pour le champ "{PATH}" est invalide, il doit être compris entre 0 et 100 !'
            ]
        },
        cores: [ CoreSchema ]
    }, {
        _id: false,
        id:  false
    } )

}

module.exports = {
    getSchemaFrom:   getSchemaFrom,
    getModelFrom:    Mongoose => null,
    registerModelTo: Mongoose => Mongoose
}
