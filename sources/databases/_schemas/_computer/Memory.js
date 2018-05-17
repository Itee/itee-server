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

    const Schema     = Mongoose.Schema

    _schema = new Schema( {
        free:  {
            type:     Number,
            default:  0,
            min:      0,
            validate: [
                freeMemory => (freeMemory >= 0),
                'La valeur "{VALUE}" pour le champ "{PATH}" est invalide, il doit être positif ou égal à zéro !'
            ]
        },
        used:  {
            type:     Number,
            default:  0,
            min:      0,
            validate: [
                useMemory => (useMemory >= 0),
                'La valeur "{VALUE}" pour le champ "{PATH}" est invalide, il doit être positif ou égal à zéro !'
            ]
        },
        total: {
            type:     Number,
            default:  0,
            min:      0,
            validate: [
                totalMemory => (totalMemory >= 0),
                'La valeur "{VALUE}" pour le champ "{PATH}" est invalide, il doit être positif ou égal à zéro !'
            ]
        },
        usage: {
            type:     Number,
            default:  0,
            min:      0,
            max:      100,
            validate: [
                memoryUsage => (memoryUsage >= 0 && memoryUsage <= 100),
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
