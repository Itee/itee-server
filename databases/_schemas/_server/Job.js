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
        project_id:     ObjectId,
        name:           {
            type:     String,
            trim:     true,
            required: 'La valeur "{VALUE}" pour le champ "{PATH}" est invalide, sa longueur doit etre comprise entre 3 et 50 caracteres !',
            validate: [
                strName => strName && strName.length >= 3 && strName.length <= 50,
                'La valeur "{VALUE}" pour le champ "{PATH}" est invalide, sa longueur doit etre comprise entre 3 et 50 caracteres !'
            ]
        },
        type_of_job:    {
            type:     String,
            required: 'La mission ne peut pas avoir le type "{VALUE}". Les types valides sont: git ou blender',
            trim:     true,
            enum:     {
                values:  'git blender tuileur'.split( ' ' ),
                message: 'La mission ne peut pas avoir le type "{VALUE}". Les types valides sont: git ou blender'
            }
        },
        options:        {
            type:    Object,
            default: {}
        },
        allowed_server: {
            type:    Number,
            default: 0,
            min:     0,
            max:     16
        },
        tasks:          [ ObjectId ],
        advancement:    {
            type:    Number,
            default: 0,
            min:     0,
            max:     100
        },
        start_at:       {
            type:    Date,
            default: Date.now
        },
        end_at:         {
            type:    Date,
            default: null
        },
        computing_time: {
            type:    Number,
            default: 0,
            min:     0
        },
        state:          {
            type:    String,
            default: 'initial',
            trim:    true,
            enum:    {
                values:  'initial running stopping finish error'.split( ' ' ),
                message: 'La mission ne peut pas avoir un état "{VALUE}". Les états valides sont: initial, running, stopping, ou finish'
            }
        },
        job_errors:     [
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

    _model = Mongoose.model( 'Job', getSchemaFrom( Mongoose ) )

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
