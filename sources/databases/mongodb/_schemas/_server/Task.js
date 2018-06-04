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
        project_id:          ObjectId,
        job_id:              ObjectId,
        associate_server_id: ObjectId,
        type_of_job:         {
            type:     String,
            required: 'La tache ne peut pas avoir le type "{VALUE}". Les types valides sont: git ou blender',
            trim:     true,
            enum:     {
                values:  'git blender tuileur'.split( ' ' ),
                message: 'La tache ne peut pas avoir le type "{VALUE}". Les types valides sont: git ou blender'
            }
        },
        options:             Object,
        start_at:            {
            type:     Date,
            required: true,
            default:  Date.now
        },
        end_at:              {
            type:    Date,
            default: null
        },
        computing_time:      {
            type:    Number,
            default: 0,
            min:     0
        },
        advancement:         {
            type:    Number,
            default: 0,
            min:     0,
            max:     100
        },
        task_errors:         [
            {
                title:   String,
                message: String
            }
        ],
        state:               {
            type:    String,
            default: 'initial',
            trim:    true,
            enum:    {
                values:  'initial running stopping finish error'.split( ' ' ),
                message: 'La tache ne peut pas avoir un état "{VALUE}". Les états valides sont: initial, running, stopping, error ou finish'
            }
        }
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

    _model = Mongoose.model( 'Task', getSchemaFrom( Mongoose ) )

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
