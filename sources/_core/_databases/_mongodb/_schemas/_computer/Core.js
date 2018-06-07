/**
 * Created by tvalcke on 26/11/2015.
 */

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

    const Schema = Mongoose.Schema

    _schema = new Schema( {
        usage: {
            type:     Number,
            default:  0,
            min:      0,
            max:      100,
            validate: [
                coreUsage => (coreUsage >= 0 && coreUsage <= 100),
                'La valeur "{VALUE}" pour le champ "{PATH}" est invalide, il doit être compris entre 0 et 100 !'
            ]
        },
        user:  Number,
        nice:  Number,
        sys:   Number,
        idle:  Number,
        irq:   Number
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
