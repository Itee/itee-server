/**
 * Created by tvalcke on 26/11/2015.
 */

let _schema = undefined
let _model  = undefined

function getSchemaFrom ( Mongoose ) {
    'use strict'

    if ( !_schema ) {
        _createSchema( Mongoose )
    }

    return _schema

}

function _createSchema ( Mongoose ) {
    'use strict'

    const Schema   = Mongoose.Schema
    const Types    = Schema.Types
    const ObjectId = Types.ObjectId

    _schema = new Schema( {
        name:           {
            type:     String,
            trim:     true,
            required: 'La valeur "{VALUE}" pour le champ "{PATH}" est invalide, sa longueur doit etre comprise entre 3 et 50 caracteres !',
            validate: [
                strName => strName && strName.length >= 3 && strName.length <= 50,
                'La valeur "{VALUE}" pour le champ "{PATH}" est invalide, sa longueur doit etre comprise entre 3 et 50 caracteres !'
            ]
        },
        description:    {
            type:     String,
            trim:     true,
            required: 'La valeur "{VALUE}" pour le champ "{PATH}" est invalide, sa longueur doit être comprise entre 20 et 500 caractères !',
            validate: [
                strDesc => strDesc && strDesc.length >= 20 && strDesc.length <= 500,
                'La valeur "{VALUE}" pour le champ "{PATH}" est invalide, sa longueur doit être comprise entre 20 et 500 caractères !'
            ]
        },
        start_date:     {
            type:    Date,
            default: Date.now
        },
        end_date:       {
            type:    Date,
            default: null
        },
        due_date:       {
            type:    Date,
            default: null
        },
        state:          {
            type:    String,
            default: 'initial',
            trim:    true,
            enum:    {
                values:  'initial finish error'.split( ' ' ),
                message: 'La tache ne peut pas avoir un état "{VALUE}". Les états valides sont: initial, running, stoping, error ou finish'
            }
        },
        assign_users:   [ ObjectId ],
        jobs:           [ ObjectId ],
        project_errors: [
            {
                title:   String,
                message: String
            }
        ]
    } )

}

function getModelFrom ( Mongoose ) {
    'use strict'

    if ( !_model ) {
        _createModel( Mongoose )
    }

    return _model

}

function _createModel ( Mongoose ) {
    'use strict'

    _model = Mongoose.model( 'Project', getSchemaFrom( Mongoose ) )

}

function registerModelTo ( Mongoose ) {

    if ( !_model ) {
        _createModel( Mongoose )
    }

    return Mongoose

}

module.exports = {
    getSchemaFrom:   getSchemaFrom,
    getModelFrom:    getModelFrom,
    registerModelTo: registerModelTo
}
