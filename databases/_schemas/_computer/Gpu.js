/**
 * Created by tvalcke on 26/11/2015.
 */

const Memory = require( './Memory' )

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

    const MemorySchema = Memory.getSchemaFrom( Mongoose )
    const Schema       = Mongoose.Schema

    _schema = new Schema( {
        name:        {
            type:    String,
            trim:    true,
            default: 'GpuDefaultName'
        },
        memory:      [ MemorySchema ],
        temperature: {
            type:     Number,
            default:  0,
            min:      0,
            max:      150,
            validate: [
                temperature => (temperature >= 0 && temperature <= 150),
                'La valeur "{VALUE}" pour le champ "{PATH}" est invalide, il doit être compris entre 0 et 150 !'
            ]
        },
        fan_speed:   {
            type:     Number,
            default:  0,
            min:      0,
            max:      100,
            validate: [
                fanSpeed => (fanSpeed >= 0 && fanSpeed <= 100),
                'La valeur "{VALUE}" pour le champ "{PATH}" est invalide, il doit être compris entre 0 et 100 !'
            ]
        }
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
