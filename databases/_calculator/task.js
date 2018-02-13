/**
 * Created by tvalcke on 26/11/2015.
 */

module.exports = function( mongoose ) {

    var TaskSchema = mongoose.Schema({
        project_id:              String,
        job_id:                  String,
        associate_calculator_id: String,
        type_of_job:             {
            type:     String,
            required: 'La tache ne peut pas avoir le type "{VALUE}". Les types valides sont: git ou blender',
            trim:     true,
            enum:     {
                values:  'git blender tuileur'.split(' '),
                message: 'La tache ne peut pas avoir le type "{VALUE}". Les types valides sont: git ou blender'
            }
        },
        options:                 Object,
        start_at:                {
            type:     Date,
            required: true,
            default:  Date.now
        },
        end_at:                  {
            type:    Date,
            default: null
        },
        computing_time:          {
            type:    Number,
            default: 0,
            min:     0
        },
        advancement:             {
            type:    Number,
            default: 0,
            min:     0,
            max:     100
        },
        task_errors:             [
            {
                title:   String,
                message: String
            }
        ],
        state:                   {
            type:    String,
            default: 'initial',
            trim:    true,
            enum:    {
                values:  'initial running stopping finish error'.split(' '),
                message: 'La tache ne peut pas avoir un état "{VALUE}". Les états valides sont: initial, running, stopping, error ou finish'
            }
        }
    });
    mongoose.model('Task', TaskSchema);

    return mongoose;

};
